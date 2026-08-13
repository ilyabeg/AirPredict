import { BrowserWindow, IpcMain } from 'electron';
import dispatchEvent from '../IPC/DispatchEvent';
import { FlightPath } from 'shared/Types/FlightPath';
import { CollisionData } from 'shared/Types/CollisionData';
import * as VectorMath from '../../shared/utils/vectorMath.utils';
import * as KinematicMath from '../../shared/utils/kinematicsMath.utils';
import * as ClientEventHandlers from '../handlers/clientNotificationHandlers';
import { Geodesic } from 'geographiclib-geodesic';

// all registered flights
let all_flights: FlightPath[] = [];

export default function setupCollisionEventHandlers(
  ipcMain: IpcMain,
  browserWindow: BrowserWindow,
  forwardErrors: <T>(action: () => Promise<T>) => Promise<T | null>
) 
{
    // event dispatcher for adding a flight and a collision if there was one
    dispatchEvent('register_flight', ipcMain, async (newFlight: FlightPath) => {
        const res = await forwardErrors(async () =>
        {
            // add flight to flights array
            all_flights.push(newFlight);

            // check for collisions
            for (const existingFlight of all_flights) {
                if (newFlight === existingFlight) continue; // ignore identical flights

                const normal_collision = checkNormalCollision(newFlight, existingFlight);

                // if they collided normally
                if (normal_collision) {
                    ClientEventHandlers.handleCollisionAlert(browserWindow, normal_collision);
                } 
                else {
                    // if they collided head on
                    const headOnCollision = checkHeadOnCollision(newFlight, existingFlight);
                    if (headOnCollision)
                        ClientEventHandlers.handleCollisionAlert(browserWindow, headOnCollision);
                }
            }
            return { success: true };
        });
        
        if (!res) throw new Error('Error occurred while registering flight collision.');
        return res;
    });

    // event dispatcher for removing flights by the flight id (which is the aircraft id)
    dispatchEvent("remove_flight", ipcMain, async (flightID: string) => {
        const res = await forwardErrors(async () =>
        {
            // remove the provided flight
            all_flights = all_flights.filter(flight => flight.aircraft.id !== flightID);
            return { success: true };
        });

        if (!res) throw new Error('Error occurred while removing flight.');
        return res;
    });
}



// ***************** collision calculations **********

// allowed time difference for collision check
const hazardTimeDiff = 3;//seconds
function checkNormalCollision(flightA: FlightPath, flightB: FlightPath) : CollisionData | null {

    if (!potentialCollision(flightA, flightB)) return null;

    console.log(`potential collision between flight ${flightA.aircraft.id} and flight ${flightB.aircraft.id} has been identified.`);

    // get the flights intersection point
    const flight_intersection = findIntersection(flightA, flightB);
    if (!flight_intersection) return null;

    // final returned data
    let collisionData: CollisionData | null = null;

    for (const intersection_point of flight_intersection) 
    {
        // if the intersection point not on both paths, skip it
        if (!isPointOnPath(flightA.start_point, flightA.end_point, intersection_point) ||
            !isPointOnPath(flightB.start_point, flightB.end_point, intersection_point)) continue;

        // distance from flight A start to intersection point
        const distA = Geodesic.WGS84.Inverse(
            flightA.start_point.lat, 
            flightA.start_point.lon, 
            intersection_point.lat, 
            intersection_point.lon
        ).s12!; // <- ! tells the compiler to ignore the possibility of undefined

        // distance from flight B start to intersection point
        const distB = Geodesic.WGS84.Inverse(
            flightB.start_point.lat, 
            flightB.start_point.lon, 
            intersection_point.lat, 
            intersection_point.lon
        ).s12!;

        // both flights' amount time to reach the intersection point
        const timeA = KinematicMath.timeToReachDistance(distA, flightA.aircraft.initial_velocity, flightA.aircraft.acceleration);
        const timeB = KinematicMath.timeToReachDistance(distB, flightB.aircraft.initial_velocity, flightB.aircraft.acceleration);
    
        // they never reach it
        if (!timeA || !timeB) continue;

        // if both planes reached this point at the same time, they collided
        const timeDiff = Math.abs(timeA - timeB);

        console.log(`flight ${flightA.aircraft.id} reached the collision point in ${timeA}`);
        console.log(`flight ${flightB.aircraft.id} reached the collision point in ${timeB}`);
        console.log(`flights time difference: ${timeDiff} seconds`);        

        if (timeDiff <= hazardTimeDiff) {
            collisionData = {
                planeA: flightA.aircraft,
                planeB: flightB.aircraft,
                time_of_collision: Math.min(timeA, timeB),
                coordinates: intersection_point,
            };
        }
    }
    return collisionData;
}

// minimum allowed distance limit between flight paths
const pathDistanceLimit = 50;//kilometers

function potentialCollision(flightA: FlightPath, flightB: FlightPath) : boolean {
    // the distance from flight A starting point to flight B starting point (in km)
    const startToStart = Geodesic.WGS84.Inverse(
        flightA.start_point.lat, flightA.start_point.lon,
        flightB.start_point.lat, flightB.start_point.lon
    ).s12! / 1000;//km

    // the distance between them is greater than their potential total distance, which means they never collide
    const totalDistanceKM = (flightA.distance + flightB.distance) / 1000;
    if (startToStart > totalDistanceKM) return false;

    // if they can potentialy reach each other, check their heading
    const headingDiff = Math.abs(flightA.heading - flightB.heading);

    // console.log(`startToStart ${startToStart} km, headingDiff ${headingDiff}`) //debug

    // if the paths are basically parallel and they are at least 50km from each other
    if (headingDiff <= 2.0 && startToStart >= pathDistanceLimit) return false;

    return true; // can potentialy collide
}

const minVectorLength = 0.0001;
function findIntersection(flightA: FlightPath, flightB: FlightPath) : { lat: number; lon: number }[] | null
{
    // get start, end vector for flight A
    const startVectorA = VectorMath.latLonToVector(flightA.start_point.lat, flightA.start_point.lon);
    const endVectorA = VectorMath.latLonToVector(flightA.end_point.lat, flightA.end_point.lon);

    // get start, end vector for flight B
    const startVectorB = VectorMath.latLonToVector(flightB.start_point.lat, flightB.start_point.lon);
    const endVectorB = VectorMath.latLonToVector(flightB.end_point.lat, flightB.end_point.lon);

    // get both flights normal vector
    const normalVectorA = VectorMath.normalize(VectorMath.crossProduct(startVectorA, endVectorA));
    const normalVectorB = VectorMath.normalize(VectorMath.crossProduct(startVectorB, endVectorB));

    const crossP = VectorMath.crossProduct(normalVectorA, normalVectorB);
    const length = VectorMath.vectorLength(crossP);

    // almost zero means the two great circles are coincident (אותו מישור) —
    // there is no single well-defined intersection point, so vector math doesn't work,
    // we need to calculate using kinematics
    if (length < minVectorLength) return null;
    
    // get the intersection vector and return the two possible lat/lon points of intersection on earth
    const intersectionVec = VectorMath.normalize(crossP);
    return [
        VectorMath.vectorToLatLon(intersectionVec),
        VectorMath.vectorToLatLon(VectorMath.negate(intersectionVec)),
    ];
}

// if distance(start -> intersection_point) + distance(intersection_point -> end) - totalDistance ~ 0
function isPointOnPath(
  start: { lat: number; lon: number },
  end: { lat: number; lon: number },
  point: { lat: number; lon: number },
  exceedBoundry = 50//meters
): boolean 
{
  const total = Geodesic.WGS84.Inverse(start.lat, start.lon, end.lat, end.lon).s12!;
  const startToPoint = Geodesic.WGS84.Inverse(start.lat, start.lon, point.lat, point.lon).s12!;
  const pointToEnd = Geodesic.WGS84.Inverse(point.lat, point.lon, end.lat, end.lon).s12!;

  return Math.abs(startToPoint + pointToEnd - total) <= exceedBoundry;
}

// if the planes are basicaly on the same exact path (great circle)
function checkHeadOnCollision(flightA: FlightPath, flightB: FlightPath): CollisionData | null {        

    const headingDiff = Math.abs(flightA.heading - flightB.heading);

    // directly heading towards each other
    if (headingDiff <= 180 || headingDiff >= 177) 
    {
        const collisTime = KinematicMath.timeToReachHeadOnCollisionPoint(
            flightA.start_point, flightB.start_point,
            flightA.aircraft.initial_velocity, flightB.aircraft.initial_velocity,
            flightA.aircraft.acceleration, flightB.aircraft.acceleration
        );

        if (collisTime === null) return null;

        // d = v*t + 0.5 * a * t^2
        const distanceToCollis = flightA.aircraft.initial_velocity * collisTime + 
            0.5 * flightA.aircraft.acceleration * collisTime ** 2;

        if (!distanceToCollis) return null;

        // get the point of collision based on plane A's starting position, direction, and distance
        const collisPoint = Geodesic.WGS84.Direct(
            flightA.start_point.lat, flightA.start_point.lon,
            flightA.heading, distanceToCollis
        );

        if (collisPoint) {
            return {
                planeA: flightA.aircraft,
                planeB: flightB.aircraft,
                time_of_collision: collisTime,
                coordinates: { 
                    lat: collisPoint.lat2!,
                    lon: collisPoint.lon2!
                }
            };
        };        
    }
    return null;
}

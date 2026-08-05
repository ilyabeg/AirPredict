import { BrowserWindow, IpcMain } from 'electron';
import dispatchEvent from '../IPC/DispatchEvent';
import { FlightPath } from 'shared/Types/FlightPath';
import { CollisionData } from 'shared/Types/CollisionData';
import * as VectorMath from '../../shared/utils/vectorMath.utils';
import * as KinematicMath from '../../shared/utils/kinematicsMath.utils';
import * as ClientEventHandlers from '../handlers/clientNotificationHandlers';
import { Geodesic } from 'geographiclib-geodesic';
import { start } from 'repl';

// all registered flights
const all_flights: FlightPath[] = [];

export default function setupCollisionEventHandlers(
  ipcMain: IpcMain,
  browserWindow: BrowserWindow,
  forwardErrors: <T>(action: () => Promise<T>) => Promise<T | null>
) 
{
    dispatchEvent('register_flight', ipcMain, async (newFlight: FlightPath) => {
        const res = await forwardErrors(async () =>
        {
          // add flight to flights array
          all_flights.push(newFlight);

          // check for collisions
          all_flights.forEach((existing) => {
            const collision = checkForCollision(newFlight, existing);
            if (collision)
              ClientEventHandlers.handleCollisionAlert(browserWindow, collision);
          });

          return { success: true };
        });
        if (!res) throw new Error('Error occurred while registering flight.');
        return res;
    });
}

// allowed time difference for collision check
const timeDiff = 5;//seconds

function checkForCollision(flightA: FlightPath, flightB: FlightPath) : CollisionData | null {

    if (!potentialCollision(flightA, flightB)) return null;

    // get the flights intersection point
    const flight_intersection = findIntersection(flightA, flightB);
    if (!flight_intersection) return null;

    // final returned data
    let collisionData: CollisionData | null = null;

    for (const intersection_point of flight_intersection) 
    {
        // if the intersection point not on both paths, skip it
        if (!isPointOnPath(flightA.start_point, flightA.end_point, intersection_point)) continue;
        if (!isPointOnPath(flightB.start_point, flightB.end_point, intersection_point)) continue;

        // distance from flight A start to intersection point
        const distA = Geodesic.WGS84.Inverse(
            flightA.start_point.lat, 
            flightA.start_point.lon, 
            intersection_point.lat, 
            intersection_point.lon
        ).s12!;

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
        if (timeA === null || timeB === null) continue;

        // if both planes reached this point at the same time, they collided
        if (Math.abs(timeA - timeB) <= timeDiff) {
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
    ).s12! / 1000;

    // the distance between them is greater than their potential total distance, which means they never collide
    if (startToStart > flightA.distance + flightB.distance) return false;

    // if they can potentialy reach each other, check their heading
    const headingDiff = Math.abs(flightA.heading - flightB.heading);

    // if the paths are basically parallel and they are at least 50km from each other
    if (headingDiff <= 2.0 && startToStart >= pathDistanceLimit) return false;

    return true; // can potentialy collide
}

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

    // almost zero means the two great circles are coincident (same plane) —
    // there is no single well-defined intersection point
    if (length < 1e-10) return null;
    
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
  exceedBoundry = 50 //meters
): boolean 
{
  const total = Geodesic.WGS84.Inverse(start.lat, start.lon, end.lat, end.lon).s12!;
  const startToPoint = Geodesic.WGS84.Inverse(start.lat, start.lon, point.lat, point.lon).s12!;
  const pointToEnd = Geodesic.WGS84.Inverse(point.lat, point.lon, end.lat, end.lon).s12!;

  return Math.abs(startToPoint + pointToEnd - total) <= exceedBoundry;
}

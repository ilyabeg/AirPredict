import { Geodesic } from 'geographiclib-geodesic';
import { FlightPath } from 'shared/Types/FlightPath';

function calcQuadraticFormula(A: number, B: number, C: number) {
  const discriminant = B ** 2 - 4 * A * C;
  if (discriminant < 0) return null; // no solutions

  const sqrtDisc = Math.sqrt(discriminant);
  const solution1 = (-B + sqrtDisc) / (2 * A);
  const solution2 = (-B - sqrtDisc) / (2 * A);

  return [solution1, solution2];
}

// get the time to reach the distance
export function timeToReachDistance(
  distance: number,
  initialVelocity: number,
  acceleration: number
): number | null {
  if (acceleration === 0) {
    if (initialVelocity <= 0)
      return null; // never gets there
    return distance / initialVelocity;
  }

  // משוואה ריבועית
  // At^2 + Bt - C = 0 -> t 1,2
  let timeSolutions = calcQuadraticFormula(
    0.5 * acceleration,
    initialVelocity,
    -distance
  );
  if (!timeSolutions) return null;

  timeSolutions = timeSolutions.filter(time => time > 0); // get only the positive time solutions
  // if there is at least 1 solution return the earliest
  return (timeSolutions.length > 0) ? Math.min(...timeSolutions) : null;
  // ... = spread operator -> return the min element inside the array
}

// x1(t) = x2(t) gives us the time of the collision
export function timeOfIntersection(
  flightA: FlightPath,
  flightB: FlightPath,
  initialVelocity1: number,
  initialVelocity2: number,
  acceleration1: number,
  acceleration2: number
): number | null {

  const A = (acceleration1 - acceleration2) / 2;
  const B = initialVelocity1 - initialVelocity2;

  // distance between the two starting points (|x1 - x2|)
  const dist = Geodesic.WGS84.Inverse(
    flightA.start_point.lat, flightA.start_point.lon,
    flightB.start_point.lat, flightB.start_point.lon
  ).s12!;

  // determine the sign of the distance 
  const C = (isInFront(flightA, flightB)) ? dist : -dist;

  // משוואה ריבועית
  if (A !== 0) {
    let timeSolutions = calcQuadraticFormula(A, B, C);
    if (!timeSolutions) return null;

    timeSolutions = timeSolutions.filter(time => time > 0); // get only the positive time solutions
    // if there is at least 1 solution return the earliest
    return (timeSolutions.length > 0) ? Math.min(...timeSolutions) : null;
  }

  // if A = 0, B != 0 -> t = -C/B
  if (B !== 0) {
    const solution = -C / B;
    return (solution >= 0) ? solution : null;
  }

  // C = 0 -> no solutions
  if (!A && !B) return null;

  return 0;
}

// helper func to check which plane is infrnot (A or B),
// if it is A the distance is positive, if its B the distance is negative.
function isInFront(
  flightA: FlightPath,
  flightB: FlightPath
): boolean {

  const headingFromBtoA = Geodesic.WGS84.Inverse(
    flightB.start_point.lat, flightB.start_point.lon,
    flightA.start_point.lat, flightA.start_point.lon
  ).azi1!;

  const headingDiff = Math.abs(headingFromBtoA - flightA.heading);

  // basicaly heading the same direction
  if (headingDiff <= 3)
    return true; // A is in front of B

  // B is in front of A
  return false;
}


export function positionAtTime(
  flight: FlightPath,
  time: number
): { lat: number, lon: number } | null {

  const initialVelocity = flight.aircraft.initial_velocity;
  const acceleration = flight.aircraft.acceleration;

  // d(t) = v*t + 0.5 * a * t^2 = distance after time t
  const distance = (initialVelocity * time) + (0.5 * acceleration * time ** 2);

  // the position after flying 'distance' from 'start_point'
  const res = Geodesic.WGS84.Direct(
    flight.start_point.lat, flight.start_point.lon,
    flight.heading, distance
  );

  if (res) {
    return {
      lat: res.lat2!,
      lon: res.lon2!
    };
  }
  return null;
}

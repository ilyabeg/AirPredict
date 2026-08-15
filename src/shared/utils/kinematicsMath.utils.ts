import { Geodesic } from 'geographiclib-geodesic';
import { FlightPath } from 'shared/Types/FlightPath';

// get the time to reach the distance
export function timeToReachDistance(
  distance: number,
  initialVelocity: number,
  acceleration: number
): number | null 
{
  if (acceleration === 0) {
    if (initialVelocity <= 0)
        return null; // never gets there
    return distance / initialVelocity;
  }

  // משוואה ריבועית
  // At^2 + Bt - C = 0 -> t 1,2
  const a = 0.5 * acceleration;
  const b = initialVelocity;
  const c = -distance;
  const discriminant = b ** 2 - 4 * a * c;

  if (discriminant < 0) return null; // no solutions

  const sqrtDisc = Math.sqrt(discriminant);
  const solution1 = (-b + sqrtDisc) / (2 * a);
  const solution2 = (-b - sqrtDisc) / (2 * a);

  const timeSolutions = [solution1, solution2].filter(time => time > 0); // get only the positive time solutions

  // if there is at least 1 solution return the earliest
  return (timeSolutions.length > 0) ? Math.min(...timeSolutions) : null; 
  // ... = spread operator -> return the min element inside the array
}

// x1(t) = x2(t) gives us the time of the collision
export function timeOfIntersection(
  startPoint1: {lat: number, lon: number},
  startPoint2: {lat: number, lon: number},
  initialVelocity1: number,
  initialVelocity2: number,
  acceleration1: number,
  acceleration2: number
) : number | null {

  const A = (acceleration1 - acceleration2) / 2;
  const B = initialVelocity1 - initialVelocity2;
   // distance between the two starting points (|x1 - x2|)
  const C = -Geodesic.WGS84.Inverse(startPoint1.lat, startPoint1.lon, startPoint2.lat, startPoint2.lon).s12!;

  // משוואה ריבועית
  if (A !== 0) {
    const discriminant = B ** 2 - 4 * A * C;

    if (discriminant < 0) return null; // no solutions

    const sqrtDisc = Math.sqrt(discriminant);    
    const solution1 = (-B + sqrtDisc) / (2 * A);
    const solution2 = (-B - sqrtDisc) / (2 * A);

    const timeSolutions = [solution1, solution2].filter(time => time > 0); // get only the positive time solutions
    
    // if there is at least 1 solution return the earliest
    return (timeSolutions.length > 0) ? Math.min(...timeSolutions) : null;
  }

  // if A ~= 0, B != 0 -> t = -C/B
  if (Math.round(A) < 0.0001 && B !== 0) {
    return -C / B;
  }

  // C = 0 -> no solutions
  if (!A && !B) return null;

  return 0;
}

export function positionAtTime(
  flight: FlightPath,
  time: number
) : {lat: number, lon: number} | null {

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

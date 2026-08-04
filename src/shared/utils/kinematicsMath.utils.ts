
// get the time to reach the distance
export function timeToReachDistance(
  distance: number,
  initialVelocity: number,
  acceleration: number
): number | null 
{
  if (Math.abs(acceleration) === 0) {
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

  const timeSolutions = [solution1, solution2].filter(t => t > 0); // get only the positive time solutions

  // if there is at least 1 solution return the earliest
  return (timeSolutions.length > 0) ? Math.min(...timeSolutions) : null; 
  // ... = spread operator -> return the min element inside the array
}


// 3D cartesian vector
export type Vector = { x: number; y: number; z: number };

// get the 3D vector point of the lan/lon point on earth
export function latLonToVector(lat: number, lon: number): Vector {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  return {
    x: Math.cos(latRad) * Math.cos(lonRad),
    y: Math.cos(latRad) * Math.sin(lonRad),
    z: Math.sin(latRad),
  };
}

// get the lat/lon point on earth of the 3D vector point
export function vectorToLatLon(v: Vector): { lat: number; lon: number } {
  return {
    lat: Math.asin(v.z) * (180 / Math.PI),
    lon: Math.atan2(v.y, v.x) * (180 / Math.PI),
  };
}

// get the cross product of 2 vectors
export function crossProduct(a: Vector, b: Vector): Vector {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

// get the length of the 3D vector
export function vectorLength(v: Vector): number {
  return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}

// normalize the length of the vector to 1
export function normalize(v: Vector): Vector {
  const length = vectorLength(v);
  return { 
    x: v.x / length, 
    y: v.y / length, 
    z: v.z / length 
  };
}

// היפוך הווקטור - כלומר להפוך אותו לשלילי
export function negate(v: Vector): Vector {
  return { x: -v.x, y: -v.y, z: -v.z };
}

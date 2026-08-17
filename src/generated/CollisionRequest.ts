// Original file: src/gRPC/proto/collision.proto


export interface CollisionRequest {
  'planeA'?: (string);
  'planeB'?: (string);
  'timeOfCollision'?: (number | string);
  'lat'?: (number | string);
  'lon'?: (number | string);
  'timeDifference'?: (number | string);
}

export interface CollisionRequest__Output {
  'planeA': (string);
  'planeB': (string);
  'timeOfCollision': (number);
  'lat': (number);
  'lon': (number);
  'timeDifference': (number);
}

import { Plane } from "../../shared/Types/Plane";

export type CollisionData = {
  planeA: Plane,
  planeB: Plane,
  time_of_collision: number,
  coordinates: {
    lat: number,
    lon: number
  },
  time_difference: number
};

import { Plane } from "../Types/Plane";

export type FlightPath = {
    aircraft: Plane,
    start_point: {
        lat: number,
        lon: number,
    },
    end_point: {
        lat: number,
        lon: number,
    },
    distance: number   
}
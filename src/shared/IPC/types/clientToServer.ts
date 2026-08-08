import { FlightPath } from "shared/Types/FlightPath";

/* eslint-disable prettier/prettier */
export interface IPCMethods {
    calculate_flight_path_distance: {
        request: {
            start_point: {
                lat: number;
                lon: number;
            };
            end_point: {
                lat: number;
                lon: number;
            };
        };
        response: { 
            distance: number,
            heading: number         
        };
    };

    register_flight: {
        request: FlightPath,
        response: { success: boolean };
    };

    remove_flight: {
        request: string, //<- flight path id
        response: { success: boolean };
    };
}

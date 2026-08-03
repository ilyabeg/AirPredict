/* eslint-disable prettier/prettier */
export interface IPCMethods {
    'calculate_flight_path_distance': {
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
            distance: number; 
        };
    };
}

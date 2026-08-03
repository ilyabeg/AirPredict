export type Plane = {
    id: string,
    initial_velocity: number,
    acceleration: number,
    start_point: {
        lat: number,
        lon: number
    },
    end_point: {
        lat: number,
        lon: number
    },
    heading: number
};
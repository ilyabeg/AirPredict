import { FlightPath } from "shared/Types/FlightPath";

export const HARDCODED_COLLISIONS: FlightPath[] = [
    // =========================================================================
    // PAIR 1: NORMAL COLLISION (Cross paths)
    // Time difference: ~0.000 seconds
    // Intersection: lat: 0, lon: 0
    // =========================================================================
    {
        aircraft: { id: "FLIGHT_1A_WEST_EAST", initial_velocity: 250, acceleration: 0 },
        start_point: { lat: 0, lon: -5 },
        end_point: { lat: 0, lon: 5 },
        distance: 1113194.908,
        heading: 90
    },
    {
        aircraft: { id: "FLIGHT_1B_SOUTH_NORTH", initial_velocity: 248.3285, acceleration: 0 },
        start_point: { lat: -5, lon: 0 },
        end_point: { lat: 5, lon: 0 },
        distance: 1105751.968,
        heading: 0
    },

    // =========================================================================
    // PAIR 2: NORMAL COLLISION WITH ACCELERATION
    // Time difference: EXACTLY 3.0 seconds (Tests your hazardTimeDiff threshold)
    // Intersection: lat: 0, lon: 100
    // =========================================================================
    {
        // Reaches intersection in 1669.166 seconds
        aircraft: { id: "FLIGHT_2A_ACCELERATING", initial_velocity: 250, acceleration: 0.1 },
        start_point: { lat: 0, lon: 95 },
        end_point: { lat: 0, lon: 105 },
        distance: 1113194.908,
        heading: 90
    },
    {
        // Reaches intersection in 1672.166 seconds (Diff: 3.0s)
        aircraft: { id: "FLIGHT_2B_CONSTANT", initial_velocity: 330.645, acceleration: 0 },
        start_point: { lat: -5, lon: 100 },
        end_point: { lat: 5, lon: 100 },
        distance: 1105751.968,
        heading: 0
    },

    // =========================================================================
    // PAIR 3: HEAD-ON COLLISION (Opposite directions on the same path)
    // Time difference: ~0.000 seconds
    // Intersection: lat: 0, lon: -50
    // =========================================================================
    {
        aircraft: { id: "FLIGHT_3A_HEADON", initial_velocity: 250, acceleration: 0 },
        start_point: { lat: 0, lon: -55 },
        end_point: { lat: 0, lon: -45 },
        distance: 1113194.908,
        heading: 90
    },
    {
        aircraft: { id: "FLIGHT_3B_HEADON", initial_velocity: 250, acceleration: 0 },
        start_point: { lat: 0, lon: -45 },
        end_point: { lat: 0, lon: -55 },
        distance: 1113194.908,
        heading: 270
    },

    // =========================================================================
    // PAIR 4: PARALLEL (REAR-END) COLLISION (Same path, different speeds)
    // Time difference: ~0.000 seconds at the collision point
    // Intersection: lat: 0, lon: 50 (Front plane catches up perfectly)
    // =========================================================================
    {
        // Slower plane in front
        aircraft: { id: "FLIGHT_4A_FRONT_SLOW", initial_velocity: 200, acceleration: 0 },
        start_point: { lat: 0, lon: 45 },
        end_point: { lat: 0, lon: 55 },
        distance: 1113194.908,
        heading: 90
    },
    {
        // Faster plane behind, covering exactly double the distance to catch up
        aircraft: { id: "FLIGHT_4B_REAR_FAST", initial_velocity: 400, acceleration: 0 },
        start_point: { lat: 0, lon: 40 },
        end_point: { lat: 0, lon: 60 },
        distance: 2226389.816,
        heading: 90
    },

    // =========================================================================
    // PAIR 5: NORMAL FLIGHTS (NO COLLISION ALARM)
    // Time difference: 15 seconds (Will be correctly ignored by hazardTimeDiff)
    // Intersection: lat: 0, lon: -100
    // =========================================================================
    {
        aircraft: { id: "FLIGHT_5A_SAFE", initial_velocity: 250, acceleration: 0 },
        start_point: { lat: 0, lon: -105 },
        end_point: { lat: 0, lon: -95 },
        distance: 1113194.908,
        heading: 90
    },
    {
        // Reaches intersection 15 seconds too late to collide
        aircraft: { id: "FLIGHT_5B_SAFE", initial_velocity: 246.665, acceleration: 0 },
        start_point: { lat: -5, lon: -100 },
        end_point: { lat: 5, lon: -100 },
        distance: 1105751.968,
        heading: 0
    }
];
import * as Cesium from 'cesium';
import { Entity, useCesium } from 'resium';
import { positionAtTime, timeToReachDistance } from '../../../shared/utils/kinematicsMath.utils';
import { FlightPath } from 'shared/Types/FlightPath';

interface MovingDotProps {
    flight: FlightPath,
    flightStartTime: Cesium.JulianDate
}

export default function MovingDot({flight, flightStartTime}: MovingDotProps) {

    const cesiumContext = useCesium(); // world viewer
    if (!cesiumContext.viewer) return;

    // total flight time in seconds
    const totalFlightTime = timeToReachDistance(
        flight.distance,
        flight.aircraft.initial_velocity,
        flight.aircraft.acceleration
    );
    if (!totalFlightTime) return;
    console.log(`total flight time supposed to be: ~${Math.round(totalFlightTime/60)} minutes`); // debug check

    // start and end dates and time
    const flightEndTime = Cesium.JulianDate.addSeconds(flightStartTime, totalFlightTime, new Cesium.JulianDate());
    console.log(`flight start time: ${flightStartTime}; end time: ${flightEndTime}`); // debug check
    
    // sample flight 3d positions over time
    const computeFlight = () => {
        const sampleProperty = new Cesium.SampledPositionProperty();
        
        // add flight sample every 60 seconds        
        for (let seconds = 0; seconds <= totalFlightTime; seconds += 60) {
            const res = calculatePosAndTime(flight, seconds, flightStartTime);
            sampleProperty.addSample(res.time, res.position);

            // sample points for debug
            // console.log(`sample point at ${res.time} sec`);
            // cesiumContext.viewer!.entities.add({
            //     position: res.position,
            //     point: {
            //         pixelSize: 8,
            //         color: Cesium.Color.TRANSPARENT,
            //         outlineColor: Cesium.Color.YELLOW,
            //         outlineWidth: 3,
            //     },
            // });
        }
        //in case were greater than the final end point time
        const res = calculatePosAndTime(flight, totalFlightTime, flightStartTime);
        sampleProperty.addSample(res.time, res.position);

        return sampleProperty;
    };

    const dotPositions = computeFlight(); // sampled positions collection

    return (
        <>
            <Entity
                id={`${flight.aircraft.id}-MOV-DOT`}

                //availability = when the entity is visible
                availability={ 
                    new Cesium.TimeIntervalCollection([
                        new Cesium.TimeInterval({
                            start: flightStartTime,
                            stop: flightEndTime
                    })
                ])}

                position={dotPositions}

                point={{
                    pixelSize: 12,
                    color: Cesium.Color.YELLOW,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 1,
                    disableDepthTestDistance: 99999,
                }}

                // model={{
                //     uri: "/models/CesiumAir/Cesium_Air.glb",
                //     minimumPixelSize: 64
                // }}
            />
        </>
    );
}


// ************** helper methods *******************

// calculates the time and position of the flight at a given 'seconds' offset from the flight start
function calculatePosAndTime(
    flight: FlightPath,
    seconds: number,
    startTime: Cesium.JulianDate
) : {position: Cesium.Cartesian3, time: Cesium.JulianDate} {

    // position at time 'i'
    const positionDegrees = positionAtTime(flight, seconds); // lat lon position

    // vector position on 3d globe
    const position = Cesium.Cartesian3.fromDegrees(
        positionDegrees!.lon, positionDegrees!.lat
    );
    // julian date at time 'i'
    const time = Cesium.JulianDate.addSeconds(startTime, seconds, new Cesium.JulianDate());

    return {
        position: position,
        time: time
    };
}

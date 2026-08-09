import * as Cesium from 'cesium';
import { useEffect } from 'react';
import { Entity, useCesium } from 'resium';
import { positionAtTime, timeToReachDistance } from '../../shared/utils/kinematicsMath.utils';
import { FlightPath } from 'shared/Types/FlightPath';

interface MovingDotProps {
    flight: FlightPath
}

export default function MovingDot({flight}: MovingDotProps) {

    const cesiumContext = useCesium(); // world viewer
    if (!cesiumContext.viewer) return;

    // total flight time in seconds
    const flightTime = timeToReachDistance(
        flight.distance,
        flight.aircraft.initial_velocity,
        flight.aircraft.acceleration
    );
    if (!flightTime) return;
    console.log(`total flight time supposed to be: ~${Math.round(flightTime/60)} minutes`); // debug check

    // start and end dates and time
    const startTime = Cesium.JulianDate.fromDate(new Date());
    const endTime = Cesium.JulianDate.addSeconds(startTime, flightTime, new Cesium.JulianDate());
    console.log(`flight start time: ${startTime}; end time: ${endTime}`); // debug check

    // viewer clock configuration
    setViewerClockConfig(cesiumContext.viewer, startTime, endTime);
    
    // sample flight 3d positions over time
    const computeFlight = () => {
        const sampleProperty = new Cesium.SampledPositionProperty();
        
        // add flight sample every 60 seconds
        let seconds = 0;
        do {
            if (seconds > flightTime) seconds = flightTime;
            
            const res = calculatePosAndTime(flight, seconds, startTime);
            sampleProperty.addSample(res.time, res.position);
            seconds += 60;    

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
        while (seconds <= flightTime);

        return sampleProperty;
    };

    const dotPositions = computeFlight(); // sampled positions collection

    return (
        <>
            <Entity
                availability={ 
                    new Cesium.TimeIntervalCollection([
                        new Cesium.TimeInterval({
                            start: startTime,
                            stop: endTime
                    })
                ])}

                position={dotPositions}

                // calculate orientation automaticaly based on position movement
                orientation={new Cesium.VelocityOrientationProperty(dotPositions)}

                point={{
                    pixelSize: 12,
                    color: Cesium.Color.YELLOW,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    disableDepthTestDistance: 99999,
                }}

                // model={{
                //     uri: "../../SampleData/models/CesiumAir/Cesium_Air.glb",
                //     minimumPixelSize: 64
                // }}
            />
        </>
    );
}


// ************** helper methods *******************

function setViewerClockConfig(viewer: any, start: Cesium.JulianDate, end: Cesium.JulianDate) : void {
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = end.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.multiplier = 10;
}

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

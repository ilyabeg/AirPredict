import React, { createContext, useState } from "react";
import { FlightPath } from "../../../shared/Types/FlightPath";
import LeftClickEarth from "./LeftClickEarth";
import RightClickEarth from "./RightClickEarth";
import FlightPin from '../FlightDisplayComponents/FlightPointPin';
import MovingDot from "../FlightDisplayComponents/MovingDot";
import * as Cesium from 'cesium';
import { Entity, useCesium } from 'resium';
import WheelClickEarth from "./WheelClickEarth";


interface FlightContextProp {
    allFlights: FlightPath[],
    setFlights: React.Dispatch<React.SetStateAction<FlightPath[]>>
}
export const FlightsContext = createContext<FlightContextProp | null>(null);

export default function EarthClickControl() {

    // flights array
    const [allFlights, setFlights] = useState<FlightPath[]>([]);
    
    const cesiumContext = useCesium(); // <- all cesium main components such as viewer, scene ...
    if (!cesiumContext.viewer) return;
    
    // config a master start time for all the application flights
    const appFlightsStartTime = Cesium.JulianDate.fromDate(new Date());
    setViewerClockConfig(cesiumContext.viewer, appFlightsStartTime);

    return(
        <>
            <FlightsContext.Provider value={{allFlights, setFlights}}>
                <LeftClickEarth/>
                <RightClickEarth/>
                <WheelClickEarth/>
            </FlightsContext.Provider>

            {/* loop through all saved flights and draw them */}
            {allFlights.map((flight) => (
            <>
                {/* Start Pin */}
                <FlightPin lat={flight.start_point.lat} lon={flight.start_point.lon} color={Cesium.Color.RED} />
                
                {/* End Pin */}
                <FlightPin lat={flight.end_point.lat} lon={flight.end_point.lon} color={Cesium.Color.RED} />
                
                {/* the connecting line */}
                <Entity
                    id={flight.aircraft.id} // give the line an id to remove
                    polyline={{
                        positions: Cesium.Cartesian3.fromDegreesArray([
                        flight.start_point.lon, flight.start_point.lat,
                        flight.end_point.lon, flight.end_point.lat
                        ]),
                        width: 3,
                        material: Cesium.Color.RED,
                        clampToGround: false
                    }}
                />

                {/* moving plane dot */}
                <MovingDot flight={flight} flightStartTime={appFlightsStartTime} />
            </>
            ))}
        </>
    );
}

function setViewerClockConfig(viewer: any, start: Cesium.JulianDate) : void {
    viewer.clock.startTime = start.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.multiplier = 1;
}

import React, { createContext, useState } from "react";
import { FlightPath } from "../../shared/Types/FlightPath";
import LeftClickEarth from "../components/LeftClickEarth";
import RightClickEarth from "../components/RightClickEarth";
import FlightPin from './FlightPointPin';
import * as Cesium from 'cesium';
import { Entity } from 'resium';


interface FlightContextProp {
    allFlights: FlightPath[],
    setFlights: React.Dispatch<React.SetStateAction<FlightPath[]>>
}

export const FlightsContext = createContext<FlightContextProp | null>(null);

export default function EarthClickControl() {

    // flights array
    const [allFlights, setFlights] = useState<FlightPath[]>([]);

    return(
        <>
            <FlightsContext.Provider value={{allFlights, setFlights}}>
                <LeftClickEarth/>
                <RightClickEarth/>
            </FlightsContext.Provider>

            {/* loop through all saved flights and draw them */}
            {allFlights.map((flight) => (
            <React.Fragment key={flight.aircraft.id}>
    
                {/* Start Pin */}
                <FlightPin lat={flight.start_point.lat} lon={flight.start_point.lon} color={Cesium.Color.RED} />
                
                {/* End Pin */}
                <FlightPin lat={flight.end_point.lat} lon={flight.end_point.lon} color={Cesium.Color.RED} />
                
                {/* the connecting line */}
                <Entity
                    polyline={{
                        positions: Cesium.Cartesian3.fromDegreesArray([
                        flight.start_point.lon, flight.start_point.lat,
                        flight.end_point!.lon, flight.end_point!.lat
                        ]),
                        width: 3,
                        material: Cesium.Color.RED,
                        clampToGround: false
                    }}
                />
            </React.Fragment>
            ))}
        </>
    );
}
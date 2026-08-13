import React, { createContext, useState, useRef, useEffect } from "react";
import { FlightPath } from "../../../shared/Types/FlightPath";
import LeftClickEarth from "./LeftClickEarth";
import RightClickEarth from "./RightClickEarth";
import FlightPin from '../FlightDisplayComponents/FlightPointPin';
import MovingDot from "../FlightDisplayComponents/MovingDot";
import * as Cesium from 'cesium';
import { Entity, useCesium } from 'resium';
import WheelClickEarth from "./WheelClickEarth";


export interface FlightContextProp {
    allFlights: FlightPath[],
    setFlights: React.Dispatch<React.SetStateAction<FlightPath[]>>
}
export const FlightsContext = createContext<FlightContextProp | null>(null);

export default function EarthClickControl() {

    // flights array
    const [allFlights, setFlights] = useState<FlightPath[]>([]);
    
    const cesiumContext = useCesium(); // <- all cesium main components such as viewer, scene ...
    if (!cesiumContext.viewer) return;
    
    // create a master start time for all the application flights to start at the exact monent
    const masterStartRef = useRef<Cesium.JulianDate>();

    // connect the start time to the components mount time and only at this point in time
    useEffect(() => {
        masterStartRef.current = Cesium.JulianDate.fromDate(new Date());
        setViewerClockConfig(cesiumContext.viewer!, masterStartRef.current);
    }, []);


    // reset master time each time the flights change
    useEffect(() => {
        if (!masterStartRef) return;
        cesiumContext.viewer!.clock.currentTime = masterStartRef.current!;
    }, [allFlights]);


    // use effect to register window event listener to add hardcoded flights
    useEffect(() => {
        const addHardcodedFlight = (event: Event) => {
            const e = event as CustomEvent<FlightPath>;
            const newFlight = e.detail;
            setFlights(prevFlights => [...prevFlights, newFlight]);
        }

        const removeHardcodedFlight = (event: Event) => {
            const e = event as CustomEvent<FlightPath>;
            const removeFlight = e.detail;
            setFlights(prevFlights => prevFlights.filter(
                flight => flight.aircraft.id !== removeFlight.aircraft.id
            ));
        }

        // attach the custom event listeners to the window
        window.addEventListener('display-flight', addHardcodedFlight);
        window.addEventListener('remove-flight', removeHardcodedFlight);

        // remove listeners when component unmounts/re-renders
        return () => {
            window.removeEventListener('display-flight', addHardcodedFlight);
            window.removeEventListener('remove-flight', removeHardcodedFlight);
        }
    }, []);


    return(
        <>
            <FlightsContext.Provider value={{allFlights, setFlights}}>
                <LeftClickEarth/>
                <RightClickEarth/>
                <WheelClickEarth/>
            </FlightsContext.Provider>

            {/* loop through all saved flights and draw them */}
            {allFlights.map((flight) => (
            <React.Fragment key={`${flight.aircraft.id}`}>
                {/* Start Pin */}
                <FlightPin id={`${flight.aircraft.id}-START`} lat={flight.start_point.lat} lon={flight.start_point.lon} color={Cesium.Color.RED} />
                
                {/* End Pin */}
                <FlightPin id={`${flight.aircraft.id}-END`} lat={flight.end_point.lat} lon={flight.end_point.lon} color={Cesium.Color.RED} />
                
                {/* the connecting line */}
                <Entity
                    id={`${flight.aircraft.id}`} // give the line an id to remove
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
                <MovingDot flight={flight} flightStartTime={masterStartRef.current!} />
            </React.Fragment>
            ))}
        </>
    );
}

function setViewerClockConfig(viewer: Cesium.Viewer, start: Cesium.JulianDate) : void {
    viewer.clock.startTime = start.clone();    
    viewer.clock.multiplier = 1;
}

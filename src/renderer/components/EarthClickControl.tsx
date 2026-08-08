import React, { createContext, useState } from "react";
import { FlightPath } from "../../shared/Types/FlightPath";
import LeftClickEarth from "../components/LeftClickEarth";
import RightClickEarth from "../components/RightClickEarth";


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
        </>
    );
}
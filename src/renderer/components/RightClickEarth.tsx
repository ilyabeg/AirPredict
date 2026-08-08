import React, { useState, useContext } from 'react';
import * as Cesium from 'cesium';
import invokeServer from '../IPC/InvokeServer'; 
import { ScreenSpaceEventHandler, ScreenSpaceEvent, useCesium, Entity } from 'resium';
import { FlightsContext } from './EarthClickControl';


export default function RightClickEarth() {

    const { viewer } = useCesium(); // <- the actual 3D globe
    const flightsContextProp = useContext(FlightsContext);
    if (!flightsContextProp) return;
    
    const handleRightClick = async (movement: any) => {
        if (!viewer || !movement.position) return;

        //

        // remove the flight path from UI
        flightsContextProp.setFlights(prev => prev.filter(flight => flight.aircraft.id !== "planeA"));

        // register the flight in the backend
        invokeServer('remove_flight', "planeA");
    };

    return (
        <>
            <ScreenSpaceEventHandler>
                <ScreenSpaceEvent action={handleRightClick} type={Cesium.ScreenSpaceEventType.RIGHT_CLICK} />
            </ScreenSpaceEventHandler>
        </>
    );
}
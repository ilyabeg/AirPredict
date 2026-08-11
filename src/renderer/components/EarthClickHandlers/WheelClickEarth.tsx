import { useContext, useState } from 'react';
import * as Cesium from 'cesium';
import { ScreenSpaceEventHandler, ScreenSpaceEvent, useCesium } from 'resium';
import { FlightsContext } from './EarthClickControl';
import FlightPathDisplay from '../FlightDisplayComponents/FlightPathDisplay';
import { FlightPath } from 'shared/Types/FlightPath';

export default function WheelClickEarth() {

    const { viewer } = useCesium(); // <- the actual 3D globe container
    const flightsContextProp = useContext(FlightsContext);
    if (!flightsContextProp || !viewer) return;

    // the state of the picked flight (first click = show, another click = hide)
    const [pickedFlight, setPickedFlight] = useState<FlightPath | undefined>(undefined);

    const handleClick = (movement: any) => {
        if (!movement.position) return;

        // get the feature of the picked place (the click)
        const pickedFeature = viewer.scene.pick(movement.position);
        if (!Cesium.defined(pickedFeature)) 
            return; // nothing picked

        // console.log(`picked feature: ${pickedFeature}`); // debug
        
        if (!pickedFlight) {
            // if the picked point is an entity (meaning flight path)
            if (pickedFeature.id) // <- pickedFeature.id instanceof Cesium.Entity
            {
                const pickedFlightID = pickedFeature.id.id; // id of the entity itself
                setPickedFlight(
                    flightsContextProp.allFlights.find(flight => flight.aircraft.id === pickedFlightID)
                );
            }
        }
        else {
            setPickedFlight(undefined);
        }
    }

    return (
        <>
            <ScreenSpaceEventHandler>
                <ScreenSpaceEvent action={handleClick} type={Cesium.ScreenSpaceEventType.MIDDLE_DOWN} />
            </ScreenSpaceEventHandler>

            {/* trigger flight path display card visibility when the user actualy picks a flight */}
            {pickedFlight && <FlightPathDisplay flight={pickedFlight} />}
        </>
    );
}

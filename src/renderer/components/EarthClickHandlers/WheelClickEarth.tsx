import { useContext, useEffect, useRef, useState } from 'react';
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
    const flightRef = useRef(pickedFlight);

    useEffect(() => {
        flightRef.current = pickedFlight;
    }, [pickedFlight]);

    const handleClick = (movement: any) => {
        if (!movement.position) return;

        // get the feature of the picked place (the click)
        const pickedFeature = viewer.scene.pick(movement.position);
        if (!Cesium.defined(pickedFeature)) 
            return; // nothing picked
        
        if (flightRef.current === undefined) {
            // if the picked point is an entity (meaning flight path)
            if (pickedFeature.id) // <- pickedFeature.id instanceof Cesium.Entity
            {
                const pickedFlightID = pickedFeature.id.id; // id of the entity itself

                // if not a flight path (such as pin points)
                if (!flightsContextProp.allFlights.find(flight => flight.aircraft.id === pickedFlightID)) return;
                console.log(`showing flight: ${pickedFlightID}`);

                setPickedFlight(
                    flightsContextProp.allFlights.find(flight => flight.aircraft.id === pickedFlightID)
                );
            }
        }
        else {
            setPickedFlight(undefined);
            console.log(`hiding flight: ${flightRef.current.aircraft.id}`);
        }
    }

    return (
        <>
            <ScreenSpaceEventHandler>
                <ScreenSpaceEvent action={handleClick} type={Cesium.ScreenSpaceEventType.MIDDLE_DOWN} />
            </ScreenSpaceEventHandler>

            <div
                style={{
                top: '0px', left: '35px',
                position: 'absolute',
                zIndex: 9999,
                }}
            >
                {/* trigger flight path display card visibility when the user actualy picks a flight */}
                {pickedFlight && <FlightPathDisplay flight={pickedFlight} />}
            </div>
        </>
    );
}

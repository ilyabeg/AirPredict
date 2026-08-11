import { useContext } from 'react';
import * as Cesium from 'cesium';
import invokeServer from '../../IPC/InvokeServer'; 
import { ScreenSpaceEventHandler, ScreenSpaceEvent, useCesium, Entity, pick } from 'resium';
import { FlightsContext } from './EarthClickControl';
import {FlightPath} from '../../../shared/Types/FlightPath';


export default function RightClickEarth() {

    const { viewer } = useCesium(); // <- the actual 3D globe container
    const flightsContextProp = useContext(FlightsContext);
    if (!flightsContextProp || !viewer) return;
    
    const handleClick = async (movement: any) => {
        if (!movement.position) return;

        try {
            // get the feature of the picked place (the click)
            const pickedFeature = viewer.scene.pick(movement.position);
            if (!Cesium.defined(pickedFeature)) 
                return; // nothing picked

            // console.log(`picked feature: ${pickedFeature}`); // debug

            // if the picked point is an entity (meaning flight path), remove it
            if (pickedFeature.id) // <- pickedFeature.id instanceof Cesium.Entity
            {
                const pickedFlightID = pickedFeature.id.id; // id of the entity itself
                removeFlight(pickedFlightID, viewer, flightsContextProp.setFlights);

                // remove the flight in the backend
                invokeServer('remove_flight', pickedFlightID);               
            } else {
                // not an entity
                return;
            }
        }
        catch (error) {
            console.error('IPC bridge failed:', error);
        }
    };

    return (
        <>
            <ScreenSpaceEventHandler>
                <ScreenSpaceEvent action={handleClick} type={Cesium.ScreenSpaceEventType.RIGHT_CLICK} />
            </ScreenSpaceEventHandler>
        </>
    );
}

function removeFlight(
    flightID: string,
    viewer: any,
    setFlights: React.Dispatch<React.SetStateAction<FlightPath[]>>
) {
    // debug check
    console.log(`removing flight: ${flightID}`);

    // remove the flight path from UI
    setFlights(prev => prev.filter(flight => flight.aircraft.id !== flightID));
    viewer.entities.removeById(flightID); // מחקיה ישירה ליתר ביטחון
    viewer.entities.removeById(`${flightID}-START`); // remove start pin entity
    viewer.entities.removeById(`${flightID}-END`);   // remove end pin entity
    viewer.entities.removeById(`${flightID}-MOV-DOT`); // remove moving dot entity of this flight path

    // remove collision ascosiated with this flight if there are collisions
    const removeCollisionEvent = new CustomEvent('remove-collision-card', {detail: flightID});
    window.dispatchEvent(removeCollisionEvent); 
}
import { useContext } from 'react';
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

        try {
            // get the feature of the picked place (the click)
            const pickedFeature = viewer.scene.pick(movement.position);
            if (!Cesium.defined(pickedFeature)) 
                return; // nothing picked

            console.log(pickedFeature); // debug

            // if the picked point is an entity (meaning flight path), remove it
            if (pickedFeature.id) // <- pickedFeature.id instanceof Cesium.Entity
            {
                const pickedFlightID = pickedFeature.id.id; // id of the entity itself
                console.log(`removing flight: ${pickedFlightID}`);

                // remove the flight path from UI
                flightsContextProp.setFlights(prev => prev.filter(flight => flight.aircraft.id !== pickedFlightID));

                // register the flight in the backend
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
                <ScreenSpaceEvent action={handleRightClick} type={Cesium.ScreenSpaceEventType.RIGHT_CLICK} />
            </ScreenSpaceEventHandler>
        </>
    );
}
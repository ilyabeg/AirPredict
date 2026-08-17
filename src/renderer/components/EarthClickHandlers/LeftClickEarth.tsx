import { useState, useContext } from 'react';
import { ScreenSpaceEventHandler, ScreenSpaceEvent, useCesium } from 'resium';
import * as Cesium from 'cesium';
import invokeServer from '../../IPC/InvokeServer';
import FlightPin from '../FlightDisplayComponents/FlightPointPin';
import { FlightPath } from 'shared/Types/FlightPath';
import { FlightsContext, FlightContextProp } from './EarthClickControl';
import { AppStateContext, ConfigFlightContext, ConfigFlightProp, app_state } from '../../App';
import FadeMessage from '../general/FadeMessage';


const RAD_TO_DEG = 180 / Math.PI;

export default function LeftClickEarth() {

  const { viewer } = useCesium(); // <- the actual 3D globe
  const flightsContextProp = useContext(FlightsContext);
  const appStateContext = useContext(AppStateContext);         // app state
  const configFlightContext = useContext(ConfigFlightContext); // temp flight configurations

  if (!flightsContextProp || !viewer || !configFlightContext || appStateContext?.appState !== app_state.CLICKING)
    return;

  // reset configurations
  const resetConfigContext = () => {
    configFlightContext.setConfigFlight({
      aircraftID: "",
      velocity: 0,
      acceleration: -1
    });
  }

  // check if the temporary flight configs exist already
  const newFlightId = configFlightContext.configFlight.aircraftID;

  if (flightsContextProp.allFlights.find(flight => flight.aircraft.id === newFlightId)) {

    alert("Flight identificator must be unique.");

    appStateContext.setAppState(app_state.DEFAULT);
    resetConfigContext();

    return; /*(
      <FadeMessage message={"Flight identificator must be unique."}/>
    );*/
  }

  const [startPoint, setStartPoint] = useState<{ lat: number, lon: number } | null>(null);

  // screen space event handler for left clicking earth
  const handleClick = async (movement: any) => {
    if (!movement.position) return; // movement.position is the pixel position of the click

    // coverting the pixel position to a cartesian 3D vector on the globe
    const earthClick = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid); // <- earth ellipsoid model

    if (earthClick) {
      // raycasting calculations:

      // returns a Cartographic object that represents the clicked position on the cesium viewer.scene
      // defined by latitude, longitude (in radians) and height (which we ignore)
      const cartographic = Cesium.Cartographic.fromCartesian(earthClick);
      const lon = cartographic.longitude * RAD_TO_DEG;
      const lat = cartographic.latitude * RAD_TO_DEG;

      if (!startPoint) {
        setStartPoint({ lat: lat, lon: lon });
      }
      else {
        const endPoint = { lat: lat, lon: lon };

        try {
          // send to the backend
          const result = await invokeServer('calculate_flight_path_distance', {
            start_point: startPoint,
            end_point: endPoint
          });

          // add the new flight and reset
          addFlight(result, startPoint, endPoint, flightsContextProp, configFlightContext);
          resetConfigContext();
          resetStartAndState();
        }
        catch (error) {
          // display the error in the console and reset 
          console.error('IPC bridge failed:', error);
          resetStartAndState();
        }
      }
    }
  };

  const resetStartAndState = () => {
    setStartPoint(null);
    appStateContext.setAppState(app_state.DEFAULT);
  }

  return (
    <>
      <ScreenSpaceEventHandler>
        <ScreenSpaceEvent action={handleClick} type={Cesium.ScreenSpaceEventType.LEFT_CLICK} />
      </ScreenSpaceEventHandler>

      {/* temp violet start point */}
      {startPoint && (<FlightPin lat={startPoint.lat} lon={startPoint.lon} />)}
    </>
  );
}


// helpers

function addFlight(
  result: { distance: number, heading: number },
  startPoint: { lat: number, lon: number },
  endPoint: { lat: number, lon: number },
  flightsContextProp: FlightContextProp,
  configContext: ConfigFlightProp
) {

  // the temporary flight configurations from the config menu
  const aircraftID = configContext.configFlight.aircraftID;
  const velocity = configContext.configFlight.velocity;
  const acceleration = configContext.configFlight.acceleration;

  const newFlight: FlightPath = {
    aircraft: {
      id: aircraftID,
      initial_velocity: velocity,
      acceleration: acceleration,
    },
    start_point: startPoint,
    end_point: endPoint,
    distance: result.distance,
    heading: result.heading
  };
  flightsContextProp.setFlights(prevFlights => [...prevFlights, newFlight]);

  // register the flight in the backend
  invokeServer('register_flight', newFlight);
}

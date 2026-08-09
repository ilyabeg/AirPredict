import { useState, useContext } from 'react';
import { ScreenSpaceEventHandler, ScreenSpaceEvent, useCesium } from 'resium';
import * as Cesium from 'cesium';
import invokeServer from '../IPC/InvokeServer'; 
import FlightPin from './FlightPointPin';
import { FlightPath } from 'shared/Types/FlightPath';
import { FlightsContext } from './EarthClickControl';


const RAD_TO_DEG = 180 / Math.PI;

export default function LeftClickEarth() {
  
  const { viewer } = useCesium(); // <- the actual 3D globe
  const [startPoint, setStartPoint] = useState<{ lat: number, lon: number } | null>(null);
  const flightsContextProp = useContext(FlightsContext);
  if (!flightsContextProp) return;

  const handleLeftClick = async (movement: any) => {
    if (!viewer || !movement.position) return; // movement.position is the pixel position of the click

    // coverting the pixel position to a cartesian 3D vector on the globe
    const earthClick = viewer.camera.pickEllipsoid(
      movement.position,
      viewer.scene.globe.ellipsoid // <- earth ellipsoid model
    );

    if (earthClick) {
      // raycasting calculations:

      // returns a Cartographic object that represents the clicked position on the cesium viewer.scene
      // defined by latitude, longitude (in radians) and height (which we ignore)
      const cartographic = Cesium.Cartographic.fromCartesian(earthClick);
      const lon = cartographic.longitude * RAD_TO_DEG;
      const lat = cartographic.latitude * RAD_TO_DEG;

      // display click for debugging
      console.log(`Clicked Lat: ${lat}, Lon: ${lon}`);

      if (!startPoint) {
        console.log('Start point saved! Click again for the end point.');
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
          console.log(`Calculated distance: ${result.distance / 1000}km`);

          // add the new flight
          const newFlight: FlightPath = {
            aircraft: {
              id: window.crypto.randomUUID(),
              initial_velocity: 1, // temp for debug
              acceleration: 0,
              heading: result.heading        
            }, 
            start_point: startPoint,
            end_point: endPoint,
            distance: result.distance,
            heading: result.heading          
          };
          flightsContextProp.setFlights((prevFlights) => [...prevFlights, newFlight]); // like writing in C#: savedFlights += newFlight

          // register the flight in the backend
          invokeServer('register_flight', newFlight);

          setStartPoint(null); 
        } 
        catch (error) {
          // display the error in the console and reset the start point
          console.error('IPC bridge failed:', error);
          setStartPoint(null); 
        }
      }
    }
  };

  return (
    <>
      <ScreenSpaceEventHandler>
        <ScreenSpaceEvent action={handleLeftClick} type={Cesium.ScreenSpaceEventType.LEFT_CLICK} />
      </ScreenSpaceEventHandler>

      {/* temp violet start point */}
      {startPoint && (<FlightPin lat={startPoint.lat} lon={startPoint.lon} />)}
    </>
  );
}

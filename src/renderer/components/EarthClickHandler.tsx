import React, { useState } from 'react';
import { ScreenSpaceEventHandler, ScreenSpaceEvent, useCesium, Entity } from 'resium';
import * as Cesium from 'cesium';
import invokeServer from '../IPC/InvokeServer'; 
import FlightPin from './FlightPointPin';
import { FlightPath } from 'shared/Types/FlightPath';

export default function EarthClickHandler() {
  
  const { viewer } = useCesium(); // <- the actual 3D globe
  const [startPoint, setStartPoint] = useState<{ lat: number, lon: number } | null>(null);

  // flights array
  const [savedFlights, setSavedFlights] = useState<FlightPath[]>([]);

  const handleLeftClick = async (movement: any) => {
    if (!viewer || !movement.position) return; // movement.position is the pixel position of the click

    // coverting the pixel position to a cartesian 3D vector on the globe
    const earthClick = viewer.camera.pickEllipsoid(
      movement.position,
      viewer.scene.globe.ellipsoid // <- earth ellipsoid model
    );

    if (earthClick) {
      // raycasting calculations
      const cartographic = Cesium.Cartographic.fromCartesian(earthClick);
      const clickedLon = Cesium.Math.toDegrees(cartographic.longitude);
      const clickedLat = Cesium.Math.toDegrees(cartographic.latitude);

      // display click for debugging
      console.log(`Clicked Lat: ${clickedLat}, Lon: ${clickedLon}`);

      if (!startPoint) {
        console.log('Start point saved! Click again for the end point.');
        setStartPoint({ lat: clickedLat, lon: clickedLon });
      } 
      else {
        const endPoint = { lat: clickedLat, lon: clickedLon };

        try {
          // send to the backend
          const result = await invokeServer('calculate_flight_path_distance', {
            start_point: startPoint,
            end_point: endPoint
          });
          console.log(`Calculated distance: ${result.distance}km`);

          // add the new flight
          const newFlight: FlightPath = {
            aircraft: {
              id: window.crypto.randomUUID(), // generate a unique ID for the plane
              initial_velocity: 0,
              acceleration: 0,
              heading: 0        
            }, 
            start_point: startPoint,
            end_point: endPoint,
            distance: result.distance
          };
          setSavedFlights((prevFlights) => [...prevFlights, newFlight]); // like writing in C#: savedFlights += newFlight

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

      {/* Loop through all saved flights and draw them */}
      {savedFlights.map((flight) => (
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
                flight.end_point.lon, flight.end_point.lat
              ]),
              width: 3,
              material: Cesium.Color.RED,
              clampToGround: false,
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
}

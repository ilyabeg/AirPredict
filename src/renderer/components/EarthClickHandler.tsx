import React, { useState } from 'react';
import { ScreenSpaceEventHandler, ScreenSpaceEvent, useCesium } from 'resium';
import * as Cesium from 'cesium';
import invokeServer from '../IPC/InvokeServer'; 

export default function EarthClickHandler() {
  
  const { viewer } = useCesium();  
  const [startPoint, setStartPoint] = useState<{ lat: number, lon: number } | null>(null);

  const handleLeftClick = async (movement: any) => {
    if (!viewer || !movement.position) return;

    const earthClick = viewer.camera.pickEllipsoid(
      movement.position,
      viewer.scene.globe.ellipsoid
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
        console.log('Sending coordinates to Node.js backend...');

        try {
          // send to the backend
          const result = await invokeServer('calculate_flight_path_distance', {
            start_point: startPoint,
            end_point: endPoint
          });
          
          console.log(`Backend says distance is: ${result.distance}`);
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
    <ScreenSpaceEventHandler>
      <ScreenSpaceEvent 
        action={handleLeftClick} 
        type={Cesium.ScreenSpaceEventType.LEFT_CLICK} 
      />
    </ScreenSpaceEventHandler>
  );
}

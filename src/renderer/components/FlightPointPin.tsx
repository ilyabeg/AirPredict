import React from 'react';
import { Entity, PointGraphics } from 'resium';
import * as Cesium from 'cesium';

// FlightPin component to render start/end points
interface FlightPinPoint {
  lat: number;
  lon: number;
  color?: Cesium.Color; // ? = optional prop, default to Cesium.Color.VIOLET
}

export default function FlightPin({ lat, lon, color = Cesium.Color.VIOLET }: FlightPinPoint) {
  return (
    <Entity position={Cesium.Cartesian3.fromDegrees(lon, lat)}>
      <PointGraphics 
        pixelSize={15} 
        color={color} 
        outlineColor={Cesium.Color.WHITE} 
        outlineWidth={2} 
        disableDepthTestDistance={Number.POSITIVE_INFINITY}
      />
    </Entity>
  );
}

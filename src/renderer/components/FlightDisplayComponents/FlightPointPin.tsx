import { Entity } from 'resium';
import * as Cesium from 'cesium';

// FlightPin component to render start/end points
interface FlightPinProps {
  lat: number;
  lon: number;
  color?: Cesium.Color; // ? = optional prop, default to Cesium.Color.VIOLET
}

export default function FlightPin({ lat, lon, color = Cesium.Color.VIOLET }: FlightPinProps) {
  return (
    <Entity
      position={Cesium.Cartesian3.fromDegrees(lon, lat)}    
      point={{
        pixelSize: 12,
        color: color,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: 99999,
      }}
    />
  );
}

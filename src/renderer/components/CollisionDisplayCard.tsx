import React, { useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TimerIcon from '@mui/icons-material/Timer';
import { CollisionData } from 'shared/Types/CollisionData';
import '../Styles/CollisionCard.css'; 
import { useCesium } from 'resium';
import * as Cesium from 'cesium';

// React wraps objects in a Prop object
interface CollisionDataProp {
  collision: CollisionData;
}

export default function collisionDisplayCard({collision}: CollisionDataProp) {

  const { viewer } = useCesium();
  const cardRef = useRef<HTMLDivElement>(null); 
  // HTMLDivElement is an interface of a <div> tag, this allows us to use div properties
  // like .style, .id, .className

  useEffect(() => {
    if (!viewer) return;

    const position3D = Cesium.Cartesian3.fromDegrees(
      collision.coordinates.lon,
      collision.coordinates.lat
    );

    // function to change the card's position on screen even if we move the globe
    // to make it seem like it stays over the collision point forever
    const updateHtmlPosition = () => {
      const coords2D = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position3D);

      if (coords2D && cardRef.current) {
        cardRef.current.style.left = `${coords2D.x}px`;
        cardRef.current.style.top = `${coords2D.y}px`;
        cardRef.current.style.display = 'block'; 
      }
    };

    // we run this function every time Cesium's 3D globe model runs preRender (which is 60 fps) -
    // meaning we change the CSS left and top points 60 times per second, 
    // instead of re-rendering the whole component 60 times per second.
    viewer.scene.preRender.addEventListener(updateHtmlPosition);
    return () => {
      viewer.scene.preRender.removeEventListener(updateHtmlPosition);
    };
  }, [viewer, collision.coordinates.lat, collision.coordinates.lon]);

  return (
    <div
      ref={cardRef} // <- attach the HTMLDivElement
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)', // shift the window to centralize the anchor point to the bottm 
        pointerEvents: 'none', // make clickable throught the window
        zIndex: 9999,
        display: 'none' // start hidden until the first preRender frame calculates the coordinates
      }}
    >
    
    {/* 'sx' allows to use css directly inside this component */}
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card className="collision-container">
        
        {/* pb: '16px' is an MUI shortcut that fixes a weird default padding issue on CardContent */}
        <CardContent sx={{ pb: '16px !important' }}> {/* important! tells MUI to override it's deafult settings */}
          
          {/* Title */}
          <Box className="collision-title">
            <WarningAmberIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              COLLISION ALERT
            </Typography>
          </Box>
          
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 1.5 }} />

          {/* Plane A */}
          <Box className="collision-prop-style">
            <FlightTakeoffIcon sx={{ fontSize: 18, mr: 1, color: '#90caf9' }} />
            <Typography variant="body2">
              <strong>Flight A:</strong> {collision.planeA.id.substring(0, 8)}
            </Typography>
          </Box>

          {/* Plane B */}
          <Box className="collision-prop-style">
            <FlightTakeoffIcon sx={{ fontSize: 18, mr: 1, color: '#90caf9' }} />
            <Typography variant="body2">
              <strong>Flight B:</strong> {collision.planeB.id.substring(0, 8)}
            </Typography>
          </Box>

          {/* impact time */}
          <Box className="collision-data-style">
            <TimerIcon sx={{ fontSize: 20, mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Impact time: {Math.round(collision.time_of_collision)}s
            </Typography>
          </Box>

          {/* coordinates */}
          <Box className="collision-data-style">
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Latitude: {collision.coordinates.lat.toFixed(10).slice(0, -5)}
            </Typography>
          </Box>
          <Box className="collision-data-style">
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Longitude: {collision.coordinates.lon.toFixed(10).slice(0, -5)}
            </Typography>
          </Box>

        </CardContent>
      </Card>

      {/* pointer line and ground dot */}
      <div className="collision-line" />
      <div className="collision-point" />
      
      </Box>
    </div>
  );
}

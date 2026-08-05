import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TimerIcon from '@mui/icons-material/Timer';
import { CollisionData } from 'shared/Types/CollisionData';
import './CollisionCars.css'; 

export default function CollisionCardUI(collision: CollisionData) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <Card className="collision-container">
        
        {/* pb: '16px' is an MUI shortcut that fixes a weird default padding issue on CardContent */}
        <CardContent sx={{ pb: '16px !important' }}>
          
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
              Latitude: {Math.round(collision.coordinates.lat)}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Longitude: {Math.round(collision.coordinates.lon)}
            </Typography>
          </Box>

        </CardContent>
      </Card>

      {/* pointer line and ground dot */}
      <div className="collision-line" />
      <div className="collision-point" />
      
    </Box>
  );
}
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TimerIcon from '@mui/icons-material/Timer';
import { CollisionData } from 'shared/Types/CollisionData';

interface CollisionDataProp {
  collision: CollisionData;
}

export default function CollisionCard({collision}: CollisionDataProp) {
    return(
        <>
            {/* 'sx' allows to use css directly inside this component */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Card className="collision-container">
                
                {/* pb: '16px' is an MUI shortcut that fixes a weird default padding issue on CardContent */}
                <CardContent sx={{ pb: '16px !important' }}> {/* important! tells MUI to override it's deafult settings */}
                  
                  {/* Title */}
                  <Box className="collision-title">
                    <WarningAmberIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {(collision.time_difference <= 1) ? 'COLLISION ALERT!' : 'Potential Collision!'}
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
                  <Box className="collision-data-style" sx={{color: (collision.time_difference <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <TimerIcon sx={{ fontSize: 20, mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Impact time: {Math.round(collision.time_of_collision)}s
                    </Typography>
                  </Box>
        
                  {/* coordinates */}
                  <Box className="collision-data-style" sx={{color: (collision.time_difference <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Latitude: {collision.coordinates.lat.toFixed(10).slice(0, -5)} {/* toFixed() instead of Math.round() to keep percise number */}
                    </Typography>
                  </Box>
                  <Box className="collision-data-style" sx={{color: (collision.time_difference <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Longitude: {collision.coordinates.lon.toFixed(10).slice(0, -5)}
                    </Typography>
                  </Box>

                  {/* Plane time difference (to the collision point) */}
                  <Box className="collision-data-style" sx={{color: (collision.time_difference <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Time difference: {~collision.time_difference} seconds
                    </Typography>
                  </Box>
        
                </CardContent>
              </Card>
        
              {/* pointer line and ground dot */}
              <div className={(collision.time_difference <= 1) ? 'precise-collision-line' : 'collision-warning-line'}/>
              <div className={(collision.time_difference <= 1) ? 'precise-collision-dot' : 'collision-warning-dot'}/>
              
            </Box>
        </>
    );
}
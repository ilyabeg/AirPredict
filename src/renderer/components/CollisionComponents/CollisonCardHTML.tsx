import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TimerIcon from '@mui/icons-material/Timer';
import { CollisionData } from 'shared/Types/CollisionData';

interface CollisionDataProp {
  collision: CollisionData;
}

export default function CollisionCard({collision}: CollisionDataProp) {

    const timeDiff = collision.time_difference;
    const flightA_id = collision.planeA.id;
    const flightB_id = collision.planeB.id;
    const impactTime = collision.time_of_collision;
    //toFixed() instead of Math.round() to keep percise number
    const latFixed = collision.coordinates.lat.toFixed(10).slice(0, -5);
    const lonFixed = collision.coordinates.lon.toFixed(10).slice(0, -5);

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
                      {(timeDiff <= 1) ? 'COLLISION ALERT!' : 'Potential Collision!'}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 1.5 }} />
        
                  {/* Plane A */}
                  <Box className="collision-prop-style">
                    <FlightTakeoffIcon sx={{ fontSize: 18, mr: 1, color: '#90caf9' }} />
                    <Typography variant="body2">
                      <strong>Flight A:</strong> {flightA_id}
                    </Typography>
                  </Box>
        
                  {/* Plane B */}
                  <Box className="collision-prop-style">
                    <FlightTakeoffIcon sx={{ fontSize: 18, mr: 1, color: '#90caf9' }} />
                    <Typography variant="body2">
                      <strong>Flight B:</strong> {flightB_id}
                    </Typography>
                  </Box>
        
                  {/* impact time */}
                  <Box className="collision-data-style" sx={{color: (timeDiff <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <TimerIcon sx={{ fontSize: 20, mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Impact time: {(impactTime > 60) 
                        ? `~${Math.round(impactTime / 60)} minutes`
                        : `${Math.round(impactTime)} seconds`}
                    </Typography>
                  </Box>
        
                  {/* coordinates */}
                  <Box className="collision-data-style" sx={{color: (timeDiff <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Latitude: {latFixed}
                    </Typography>
                  </Box>
                  <Box className="collision-data-style" sx={{color: (timeDiff <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Longitude: {lonFixed}
                    </Typography>
                  </Box>

                  {/* Plane time difference (to the collision point) */}
                  <Box className="collision-data-style" sx={{color: (timeDiff <= 1) ? '#ff5252' : '#ffb74d'}}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Time difference: {timeDiff.toFixed(10).slice(0, -5)} seconds
                    </Typography>
                  </Box>
        
                </CardContent>
              </Card>
        
              {/* pointer line and ground dot */}
              <div className={(timeDiff <= 1) ? 'precise-collision-line' : 'collision-warning-line'}/>
              <div className={(timeDiff <= 1) ? 'precise-collision-dot' : 'collision-warning-dot'}/>
              
            </Box>
        </>
    );
}
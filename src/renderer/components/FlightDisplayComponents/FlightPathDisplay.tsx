import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CompassIcon from '@mui/icons-material/Explore';
import LengthIcon from '@mui/icons-material/SyncAlt';
import TimerIcon from '@mui/icons-material/TimerOutlined';
import GlobeIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { FlightPath } from 'shared/Types/FlightPath';
import { timeToReachDistance } from 'shared/utils/kinematicsMath.utils';
import '../../Styles/PathDisplay.css';

interface FlightPathDisplayProps {
    flight: FlightPath
}

export default function FlightPathDisplay({flight}: FlightPathDisplayProps) {

    const calculateFlightTime = (flight: FlightPath) => {
        const seconds = timeToReachDistance(
            flight.distance, flight.aircraft.initial_velocity,
            flight.aircraft.acceleration
        );
        return Math.round(seconds! / 60);
    }

    return (
        <>
            {/* 'sx' allows to use css directly inside this component */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Card className="container">
                
                {/* pb: '16px' is an MUI shortcut that fixes a weird default padding issue on CardContent */}
                <CardContent sx={{ pb: '16px !important' }}> {/* important! tells MUI to override it's deafult settings */}
                  
                    {/* flight id */}
                    <Box className="title">
                        <GlobeIcon sx={{ fontSize: 19, mr: 1, color: '#ffffff' }} />
                        <Typography variant="body2">
                            <strong>AirCraft ID:</strong> {flight.aircraft.id.substring(0, 8)}
                        </Typography>
                    </Box>

                    <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 1.5 }} />
    
                    {/* start point coordinates */}
                    <Box className="field-style">
                        <FlightTakeoffIcon sx={{ fontSize: 19, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'lighter' }}>
                            {/* toFixed() instead of Math.round() to keep percise number */}
                            <strong>Start Point:</strong> {flight.start_point.lat.toFixed(10).slice(0, -5)}°, {flight.start_point.lon.toFixed(10).slice(0, -5)}°
                        </Typography>
                    </Box>
                    {/* end point coordinates */}
                    <Box className="field-style">
                        <FlightLandIcon sx={{ fontSize: 19, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'lighter' }}>
                            <strong>End Point:</strong> {flight.end_point.lat.toFixed(10).slice(0, -5)}°, {flight.end_point.lon.toFixed(10).slice(0, -5)}°
                        </Typography>
                    </Box>

                    {/* distance & heading */}
                    <Box className="field-style">
                        <LengthIcon sx={{ fontSize: 19, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'lighter' }}>
                            <strong>Distance:</strong> {(flight.distance / 1000).toFixed(10).slice(0, -5)} km
                        </Typography>
                    </Box>
                    <Box className="field-style">
                        <CompassIcon sx={{ fontSize: 19, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'lighter' }}>
                            <strong>Heading:</strong> {flight.heading.toFixed(10).slice(0, -5)}°
                        </Typography>
                    </Box>

                    {/* velocity & acceleration */}
                    <Box className="field-style">
                        <SpeedIcon sx={{ fontSize: 20, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'lighter', mr: '8px' }}>
                            <strong>Initial Velocity:</strong> {flight.aircraft.initial_velocity} m/s
                        </Typography>
                    </Box>
                    <Box className="field-style">
                        <RocketLaunchIcon sx={{ fontSize: 20, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'lighter', mr: '8px' }}>
                            <strong>Acceleration:</strong> {flight.aircraft.acceleration} m/s²
                        </Typography>
                    </Box>

                    {/* total flight time */}
                    <Box className="field-style">
                        <TimerIcon sx={{ fontSize: 20, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'lighter' }}>
                            <strong>Flight time:</strong> ~{calculateFlightTime(flight)} minutes
                        </Typography>
                    </Box>
        
                </CardContent>
              </Card>
            </Box>
        </>
    );
}

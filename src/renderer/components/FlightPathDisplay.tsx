import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { FlightPath } from 'shared/Types/FlightPath';

export default function FlightPathDisplay(flight: FlightPath) {
    return (
        <>
            {/* 'sx' allows to use css directly inside this component */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Card className="container">
                
                {/* pb: '16px' is an MUI shortcut that fixes a weird default padding issue on CardContent */}
                <CardContent sx={{ pb: '16px !important' }}> {/* important! tells MUI to override it's deafult settings */}
                  
                    {/* flight id */}
                    <Box className="title">
                        <FlightTakeoffIcon sx={{ fontSize: 18, mr: 1, color: '#90caf9' }} />
                        <Typography variant="body2">
                        <strong>AirCraft ID:</strong> {flight.aircraft.id.substring(0, 8)}
                        </Typography>
                    </Box>

                    <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 1.5 }} />
    
                    {/* start point coordinates */}
                    <Box className="endpoint-style">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {/* toFixed() instead of Math.round() to keep percise number */}
                            Start Point: {flight.start_point.lat.toFixed(10).slice(0, -5)}°, {flight.start_point.lon.toFixed(10).slice(0, -5)}°
                        </Typography>
                    </Box>
                    {/* end point coordinates */}
                    <Box className="endpoint-style">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            End Point: {flight.end_point.lat.toFixed(10).slice(0, -5)}°, {flight.end_point.lon.toFixed(10).slice(0, -5)}°
                        </Typography>
                    </Box>

                    {/* distance & heading */}
                    <Box className="endpoint-style">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Distance: {flight.distance.toFixed(10).slice(0, -5)}KM
                        </Typography>
                    </Box>
                    <Box className="endpoint-style">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Heading: {flight.heading}°
                        </Typography>
                    </Box>
        
                </CardContent>
              </Card>
            </Box>
        </>
    );
}
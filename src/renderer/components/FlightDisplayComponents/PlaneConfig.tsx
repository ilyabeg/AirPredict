import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActive';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import '../../Styles/PlaneConfig.css';

export default function PlaneConfig() {

    const validateInput = () => {

    };

    return (
        <>
            <div className='content-wrapper'>
                {/* 'sx' allows to use css directly inside this component */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card className="container" >
                        
                        {/* pb: '16px' is an MUI shortcut that fixes a weird default padding issue on CardContent */}
                        <CardContent sx={{ pb: '16px !important' }}> {/* important! tells MUI to override it's deafult settings */}
                        
                            {/* flight id */}
                            <Box className="title">
                                <Typography variant="h6">
                                    <strong>Plane Configuration</strong>
                                </Typography>
                            </Box>

                            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 1.5 }} />
            
                            {/* config settings */}
                            <Box className="setting">
                                <AirplaneIcon sx={{ fontSize: 18, mr: 1, color: '#d8d8d8' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: '8px' }}>
                                    Aircraft ID:
                                </Typography>
                                <input className="user-input" placeholder='Enter ID (optional)...' />
                            </Box>

                            <Box className="setting">
                                <SpeedIcon sx={{ fontSize: 18, mr: 1, color: '#d8d8d8' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: '8px' }}>
                                    Initial Velocity:
                                </Typography>
                                <input className="user-input" placeholder='Enter velocity...' />
                            </Box>

                            <Box className="setting">
                                <RocketLaunchIcon sx={{ fontSize: 18, mr: 1, color: '#d8d8d8' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: '8px' }}>
                                    Acceleration:
                                </Typography>
                                <input className="user-input" placeholder='Enter acceleration...' />
                            </Box>

                            <Box>
                                <button className='done-btn' onClick={validateInput}>Done</button>
                            </Box>

                        </CardContent>
                    </Card>
                </Box>
            </div>
        </>
    );
}

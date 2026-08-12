import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActive';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import '../../Styles/PlaneConfig.css';
import { useContext, useState } from 'react';
import { AppStateContext, ConfigFlightContext, app_state } from '../../App';


export default function PlaneConfig() {
    
    const appStateContext = useContext(AppStateContext);
    const configFlightContext = useContext(ConfigFlightContext);  

    const [id, setID] = useState<string | null>(null); 
    const [velocity, setVelocity] = useState<number | undefined>(undefined);
    const [accel, setAccel] = useState<number | undefined>(undefined);  

    const registerFlight = () => {    
        if (!appStateContext || !configFlightContext) return;

        // local variable to fix stale id bug
        let aircraftID;

        // if the id is null or a whitespace    
        if (!id || !id.trim()) {
            aircraftID = window.crypto.randomUUID(); // <- random generated string id
        } else {
            aircraftID = id;
        }
        if (aircraftID !== id) setID(aircraftID);

        if (!velocity || velocity <= 0) {
            const velInput = document.getElementById("velocity-input") as HTMLInputElement;
            velInput.value = '';
            velInput.focus();
            return;
        }

        if (accel === undefined || accel < 0) {
            const accelInput = document.getElementById("acceleration-input") as HTMLInputElement;
            accelInput.value = '';
            accelInput.focus();
            return;
        }

        // save temp config flight details ...
        configFlightContext.setConfigFlight({
            aircraftID: aircraftID,
            velocity: velocity,
            acceleration: accel
        });

        // set state to clicking to add flight path
        appStateContext.setAppState(app_state.CLICKING);
    };

    const cencelConfig = () => {
        if (!appStateContext) return;
        appStateContext.setAppState(app_state.DEFAULT);
    }

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
                                <AirplaneIcon sx={{ fontSize: 20, mr: 1, color: '#d8d8d8' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: '8px' }}>
                                    Aircraft ID:
                                </Typography>
                                <input className="user-input" type='text'
                                    placeholder='Enter ID (optional)...' 
                                    onBlur={(blurEvent) => setID(blurEvent.target.value)} />
                            </Box>

                            <Box className="setting">
                                <SpeedIcon sx={{ fontSize: 20, mr: 1, color: '#d8d8d8' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: '8px' }}>
                                    Initial Velocity:
                                </Typography>
                                <input className="user-input" type='number' id='velocity-input'
                                    placeholder='Enter velocity...' 
                                    onBlur={(blurEvent) => setVelocity(blurEvent.target.valueAsNumber)} />
                            </Box>

                            <Box className="setting">
                                <RocketLaunchIcon sx={{ fontSize: 20, mr: 1, color: '#d8d8d8' }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mr: '8px' }}>
                                    Acceleration:
                                </Typography>
                                <input className="user-input" type='number' id='acceleration-input'
                                    placeholder='Enter acceleration...' 
                                    onBlur={(blurEvent) => setAccel(blurEvent.target.valueAsNumber)} />
                            </Box>

                            <Box className="buttons-container">
                                <div className='buttons-wrapper'>
                                    <button className='option-btn' onClick={cencelConfig}>Cancel</button>
                                    <button className='option-btn' onClick={registerFlight}>Done</button>
                                </div>
                            </Box>

                        </CardContent>
                    </Card>
                </Box>
            </div>
        </>
    );
}

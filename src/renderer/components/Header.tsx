import { useState } from 'react';
import '../Styles/Header.css';
import PlaneConfig from './FlightDisplayComponents/PlaneConfig';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

export default function Header() {

    const [planeConfVisibility, setVisibility] = useState<boolean>(false);

    const handleClick = () => {
        setVisibility(true);
    };

    return (
        <header className="app-header">
            <div className='planes-img'>
                <ConnectingAirportsIcon sx={{ fontSize: 45, mt: 1, mr: .5, color: 'whitesmoke' }} />
            </div>
            <h1 className="header-title">AirPredict</h1>
            <button onClick={handleClick}>Add Flight</button>
            {planeConfVisibility && <PlaneConfig />}
        </header>
    );
}
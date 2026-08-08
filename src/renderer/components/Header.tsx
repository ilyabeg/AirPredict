import { useState } from 'react';
import '../Styles/Header.css';
import PlaneConfig from './PlaneConfig';

export default function Header() {

    const [planeConVis, setVisibility] = useState<boolean>(false);

    const handleClick = () => {
        setVisibility(true);
    };

    return (
        <header className="app-header">
            <h1 className="header-title">AirPredict</h1>
            <button onClick={handleClick}>Add Flight</button>
            <button >Remove Flight</button>
            {planeConVis && <PlaneConfig />}
        </header>
    );
}
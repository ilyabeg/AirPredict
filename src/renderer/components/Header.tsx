import { useContext } from 'react';
import '../Styles/Header.css';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { AppStateContext, app_state } from '../App';

export default function Header() {

    // context of the app state
    const appStateContext = useContext(AppStateContext);

    // start configuring the plane object
    const handleClick = () => {
        if (appStateContext?.appState !== app_state.CONFIGURING)
            appStateContext?.setAppState(app_state.CONFIGURING);
    };

    // personal note: no need to use useCallback or useMemo hooks here to stop the component
    // from re-rendering when he changes the appState because using hooks uses more memory
    // allocation and CPU cycles, and if a component is simple and light weight as this one,
    // it is sometimes better to just let the component re-render because react is lightning
    // fast with re-rendering small and simple components.

    return (
        <header className="app-header">
            <div className='planes-img'>
                <ConnectingAirportsIcon sx={{ fontSize: 45, mt: 1, mr: .5, color: 'whitesmoke' }} />
            </div>
            <h1 className="header-title">AirPredict</h1>
            <button onClick={handleClick}>Add Flight</button>
        </header>
    );
}

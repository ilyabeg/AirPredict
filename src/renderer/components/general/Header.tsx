import { useContext, useState } from 'react';
import '../../Styles/Header.css';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { AppStateContext, app_state } from '../../App';
import { HARDCODED_COLLISIONS } from '../../../shared/utils/HardcodedCollisions.utils';
import invokeServer from 'renderer/IPC/InvokeServer';
import dispatchWindowEvent from 'renderer/WindowEvents/DispatchWindowEvent';

export default function Header() {

    // context of the app state
    const appStateContext = useContext(AppStateContext);

    // start configuring the plane object
    const handleClick = () => {
        if (appStateContext && appStateContext.appState === app_state.DEFAULT){
            appStateContext.setAppState(app_state.CONFIGURING);
        }
    };

    // personal note: no need to use useCallback or useMemo hooks here to stop the component
    // from re-rendering when he changes the appState because using hooks uses more memory
    // allocation and CPU cycles, and if a component is simple and light weight as this one,
    // it is sometimes better to just let the component re-render because react is lightning
    // fast with re-rendering small and simple components.


    // state to remember if collisions are currently displayed
    const [collisionsVisible, setColVisibility] = useState<boolean>(false);

    const addCollisions = () => {
        if (collisionsVisible) return;

        // add flight in backend and render harcoded collisions
        HARDCODED_COLLISIONS.forEach(flight => {
            invokeServer('register_flight', flight);
            dispatchWindowEvent('display-flight', flight);
        });
        setColVisibility(true);
    };

    const removeCollisions = () => {
        if (!collisionsVisible) return;

        // delete harcoded collision flights from backend
        HARDCODED_COLLISIONS.forEach(flight => {
            invokeServer('remove_flight', flight.aircraft.id);
            dispatchWindowEvent('remove-collision-card', flight.aircraft.id);
            dispatchWindowEvent('remove-flight', flight);
        });
        setColVisibility(false);
    };

    return (
        <header className="app-header">
            <div className='planes-img'>
                <ConnectingAirportsIcon sx={{ fontSize: 45, mt: 1, mr: .5, color: 'whitesmoke' }} />
            </div>
            <h1 className="header-title">AirPredict</h1>
            <button onClick={addCollisions}>Add Collisions</button>
            <button onClick={removeCollisions}>Remove Collisions</button>
            <button onClick={handleClick}>Add Flight</button>
        </header>
    );
}

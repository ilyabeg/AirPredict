import './App.css';
import useServerEventHandlers from './hooks/serverEventHandlers.hook';
import Header from './components/Header';
import { Provider, Viewer } from 'resium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import EarthClickControl from './components/EarthClickHandlers/EarthClickControl';
import CollisionControl from './components/CollisionComponents/CollisionControl';
import PlaneConfig from './components/FlightDisplayComponents/PlaneConfig';
import { useState, createContext } from 'react';

// tell cesium exactly where to find all cesium assets
(window as any).CESIUM_BASE_URL = '/cesium/';

// application states
export enum app_state {
  DEFAULT, CONFIGURING, CLICKING
}

export interface StateContextProp {
  appState: app_state,
  setAppState: React.Dispatch<React.SetStateAction<app_state>>
}

// create appState context for child elements to updtate the app state.
// for example: when adding a flight, the state should be CONFIGURING and block everything else
export const AppStateContext = createContext<StateContextProp | null>(null);

export default function App() {
  useServerEventHandlers();

  // save app state for configuring a flight and adding it to memory
  const [appState, setAppState] = useState<app_state>(app_state.DEFAULT);

  return (
    <>
      {/* pass the context to children */}
      <AppStateContext.Provider value={{appState, setAppState}}>
        <div className="body-container">      
          {/* app header component */}
          <Header />

          <div className="main-content">
            {/* cesium virtual globe viewer */}
            <Viewer
              full 
              geocoder={false} 
              baseLayer={false}
              timeline={true}
              sceneModePicker={false}
              infoBox={false} // disables the gray popup box in the top right
              shouldAnimate={true}
              >  

              {/* configuring plane only if state is CONFIGURING */}    
              <PlaneConfig/>    

              {/* clicking earth logic */}
              <EarthClickControl />

              {/* collision displayer */}
              <CollisionControl />

              {/* Your 3D airplane path components will eventually go here */}
            </Viewer>
          </div>
        </div>
      </AppStateContext.Provider>    
    </>
  );
}

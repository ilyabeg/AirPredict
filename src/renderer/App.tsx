import './App.css';
import useServerEventHandlers from './hooks/serverEventHandlers.hook';
import Header from './components/general/Header';
import { Viewer } from 'resium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import EarthClickControl from './components/EarthClickHandlers/EarthClickControl';
import CollisionControl from './components/CollisionComponents/CollisionControl';
import PlaneConfig from './components/FlightDisplayComponents/PlaneConfig';
import { useState, createContext, useEffect } from 'react';
import FadeMessage from './components/general/FadeMessage';

// tell cesium exactly where to find all cesium assets
(window as any).CESIUM_BASE_URL = '/cesium/';
document.title = 'AirPredict';

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


export type TemporaryFlightConfigs = {
  aircraftID: string,
  velocity: number,
  acceleration: number
}
export interface ConfigFlightProp {
  configFlight: TemporaryFlightConfigs,
  setConfigFlight: React.Dispatch<React.SetStateAction<TemporaryFlightConfigs>>
}
// temporary flight configuration fields to provide for the left click earth handler from the configuration menu
export const ConfigFlightContext = createContext<ConfigFlightProp | null>(null);


export default function App() {

  useServerEventHandlers();

  // save app state for configuring a flight and adding it to memory
  const [appState, setAppState] = useState<app_state>(app_state.DEFAULT);

  // later on, save temporary flight configuration settings in this onject
  // and provide it to the earth click handler to add the complete flight
  const [configFlight, setConfigFlight] = useState<TemporaryFlightConfigs>({ aircraftID: "", velocity: 0, acceleration: -1 });

  return (
    <>
      {/* pass the context to children */}
      <AppStateContext.Provider value={{ appState, setAppState }}>
        <ConfigFlightContext.Provider value={{ configFlight, setConfigFlight }}>

          <div className="body-container">
            {/* app header component */}
            <Header />

            <div className="main-content">
              {/* configuring plane only if state is CONFIGURING */}
              {appState === app_state.CONFIGURING && <PlaneConfig />}

              {/* show the user instructions after plane config */}
              {appState === app_state.CLICKING && (<FadeMessage message={"Click twice on the Earth to add the flight path."} />)}

              {/* cesium virtual globe viewer */}
              <Viewer
                full
                geocoder={false}
                baseLayer={false}
                timeline={true}
                sceneModePicker={false}
                infoBox={false} // disables the gray popup box in the top right
                selectionIndicator={false}
                shouldAnimate={true}
              >

                {/* clicking earth logic */}
                <EarthClickControl />

                {/* collision displayer */}
                <CollisionControl />

                {/* Your 3D airplane path components will eventually go here */}
              </Viewer>
            </div>
          </div>

        </ConfigFlightContext.Provider>
      </AppStateContext.Provider>
    </>
  );
}

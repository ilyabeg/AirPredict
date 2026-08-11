import './App.css';
import useServerEventHandlers from './hooks/serverEventHandlers.hook';
import Header from './components/Header';

import { Viewer } from 'resium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import EarthClickControl from './components/EarthClickHandlers/EarthClickControl';
import CollisionControl from './components/CollisionComponents/CollisionControl';

(window as any).CESIUM_BASE_URL = '/cesium/';

export default function App() {
  useServerEventHandlers();

  return (
    <div className="body-container">

      <Header />

      <div className="main-content">
        <Viewer
          full 
          geocoder={false} 
          baseLayer={false}
          timeline={true}
          sceneModePicker={false}
          infoBox={false} // disables the gray popup box in the top right
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
  );
}

import './App.css';
import useServerEventHandlers from './hooks/serverEventHandlers.hook';
import Header from './components/Header';

import { Viewer } from 'resium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import EarthClickControl from './components/EarthClickControl';
import CollisionControl from './components/CollisionControl';

(window as any).CESIUM_BASE_URL = '/cesium/';

//ArcGisMapService.defaultAccessToken = 'AAPTap2eINaU6G_99zFJ8U33jKg..6OAhz7wUcpk8WATWdIuRXUIwah3cEnnfjNkf8Yv-4rlcF2w1p_K6i0GPYh2QOSl2Exa2UmsDL5fjpVdADC40Yr3n7RrRIHM0PqyXXfK4URKTnHPQITzEimdJ_qGeP-rBhB4vqSvqhzsxXYaMaE1MA_PC4L4hkUXccPF4Z6TmkEShsZhO4fwEBSFDDRDw_pOuJDXw7zX_OXgFf-ugMhCn0P_4oExmABpEvdjyj6fiXD-9xx-xvualLE-miICXAT1_A56IJgWo';

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
          //baseLayerPicker={false}
          timeline={false}
          animation={false}
          sceneModePicker={false}
          infoBox={false} // disables the gray popup box in the top right
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

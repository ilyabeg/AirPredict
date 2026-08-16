import { IpcMain } from 'electron';
import dispatchEvent from '../IPC/DispatchEvent';

// Import Karney's Geodesic library
import { Geodesic } from 'geographiclib-geodesic';

// This function sets up the IPC event handlers related to flight calculations.
export default function setupFlightEventHandlers(
  ipcMain: IpcMain,
  forwardErrors: <T>(action: () => Promise<T>) => Promise<T | null>
) {
  dispatchEvent('calculate_flight_path_distance', ipcMain,
    // The handler function for 'calculate_flight_path_distance' event
    async (param) => {

      const res = await forwardErrors(async () => {
        const { start_point, end_point } = param;

        // Execute the Inverse Algorithm on the standard WGS84 Earth model
        const result = Geodesic.WGS84.Inverse(
          start_point.lat,
          start_point.lon,
          end_point.lat,
          end_point.lon
        );

        // GeographicLib uses mathematical notation: 's12' means "distance between point 1 and point 2" in METERS.
        // "mathematical notation" = a system of specialized symbols, letters, and signs used
        //                           to write math and science ideas clearly, briefly, and accurately.
        const distance = result.s12;
        let heading = result.azi1; // Get the heading from the inverse algorithm result (heading = azimuth1)

        if (distance === undefined || heading === undefined) {
          throw new Error('Failed to calculate distance or heading using Karney Inverse Algorithm.');
        }

        // normalize the heading from (-180 to 180) to standard a compass (0 to 360)
        if (heading < 0) {
          heading += 360;
        }

        return {
          distance: distance,//meters
          heading: heading
        };
      });

      if (!res) {
        throw new Error('Error occurred while calculating flight path distance.');
      }
      return res;
    }
  );
}

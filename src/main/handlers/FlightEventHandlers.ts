import { IpcMain } from 'electron';
import dispatchEvent from '../IPC/DispatchEvent';

// Import Karney's Geodesic library
import { Geodesic } from 'geographiclib-geodesic';

// This function sets up the IPC event handlers related to flight calculations.
export default function setupFlightEventHandlers(
  ipcMain: IpcMain,
  forwardErrors: <T>(action: () => Promise<T>) => Promise<T | null>
) 
{
  dispatchEvent('calculate_flight_path_distance', ipcMain,
    // The handler function for 'calculate_flight_path_distance' event
    async (param) => {
      
      const res = await forwardErrors(async () => {
        const { start_point, end_point } = param;

        console.log(`Calculating Karney Inverse from Lat: ${start_point.lat} to Lat: ${end_point.lat}`);

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
        const distanceInMeters = result.s12;
        if (distanceInMeters === undefined) {
          throw new Error('Failed to calculate distance using Karney Inverse Algorithm.');
        }

        // Convert distance to kilometers
        const distanceInKm = distanceInMeters / 1000;
        console.log(`Calculation complete: ${distanceInKm} km`);

        return {
          distance: distanceInKm 
        };
      });

      if (!res) {
        throw new Error('Error occurred while calculating flight path distance.');
      }
      return res;
    }
  );
}

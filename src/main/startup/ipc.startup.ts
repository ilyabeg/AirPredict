import { BrowserWindow } from 'electron';
import * as ClientEventHandlers from '../handlers/clientNotificationHandlers';
import setupFlightEventHandlers from '../handlers/FlightEventHandlers';
import setupCollisionEventHandlers from '../handlers/CollisionEventHandlers';
import { ErrorMessage } from '../../shared/Types/ErrorMessage';
import createStackTraceFromException from '../../shared/utils/StackTrace.utils';

// Uses for registering ipc events (client requests) with a functions.

export default function setIpcRoutes(
  // eslint-disable-next-line no-undef
  ipcMain: Electron.IpcMain,
  browserWindow: BrowserWindow
) 
{
  async function forwardErrorsToClient<T>(action: () => Promise<T>): Promise<T | null> 
  {
    try {
      return action(); // try to execute the event handler 
    } 
    catch (ex: any) 
    {
      // eslint-disable-next-line camelcase
      const err_msg: ErrorMessage = {
        stringMessage: `Error from server: ${createStackTraceFromException(ex)}`
      };

      // if handler crashed, forward error to Frontend UI
      try {
        ClientEventHandlers.handleErrorMessage(browserWindow, err_msg);
      } 
      catch (exc: any) {
        console.log(
          // eslint-disable-next-line prettier/prettier
          `Exception while handling exception. ${createStackTraceFromException(exc)}`
        );
      }
      return null;
    }
  }

  // Registering events with the ipcMain
  setupFlightEventHandlers(ipcMain, forwardErrorsToClient);
  setupCollisionEventHandlers(ipcMain, browserWindow, forwardErrorsToClient);
}

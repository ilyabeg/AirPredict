/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import { ErrorMessage } from '../../shared/Types/ErrorMessage';
import { offServerEvent, onServerEvent } from '../IPC/OnServerEvent';
import { CollisionData } from 'shared/Types/CollisionData';

export default function useServerEventHandlers() {

  // callback functions stored in memory once the app renders (created only once)
  const errorMessageHandler = useCallback(
    (_event: IpcRendererEvent, err: ErrorMessage) => {
      console.error(`Error from server: ${err.stringMessage}`);
    },
    []
  );

  // callback function for collision alerts and displaying them in the UI
  const collisionAlertHandler = useCallback(
    (_event: IpcRendererEvent, collision: CollisionData) => {
      console.warn(`
        Collision! At latitude: ${collision.coordinates.lat} - longitude ${collision.coordinates.lon}, 
        at time: ${collision.time_of_collision}`
      );
      // render the collision display
      const alertEvent = new CustomEvent('display-collision-card', { detail: collision });
      window.dispatchEvent(alertEvent);
    },
    []
  );

  useEffect(() => {
    onServerEvent('error_message', errorMessageHandler, false);
    onServerEvent('collision_alert', collisionAlertHandler, false);

      // a promise that these functions will be disposed when the components die (unmount)
    return () => {
      offServerEvent('error_message', errorMessageHandler);
      offServerEvent('collision_alert', collisionAlertHandler);
    };
  }, [errorMessageHandler, collisionAlertHandler]);
}

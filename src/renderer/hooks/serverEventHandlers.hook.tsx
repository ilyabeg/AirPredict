/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useContext, useEffect } from 'react';
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

  const collisionAlertHandler = useCallback(
    (_event: IpcRendererEvent, collision: CollisionData) => {
      console.warn(`
        Collision! At latitude: ${collision.coordinates.lat} - longitude ${collision.coordinates.lon}, 
        at time: ${collision.time_of_collision}`
      );
      //<FlightPin lat={collision.coordinates.lat} lon={collision.coordinates.lon} />
    },
    []
  );

  // a promise that these functions will be disposed when the components die
  useEffect(() => {
    onServerEvent('error_message', errorMessageHandler, false);
    onServerEvent('collision_alert', collisionAlertHandler, false);

    return () => {
      offServerEvent('error_message', errorMessageHandler);
      offServerEvent('collision_alert', collisionAlertHandler);
    };
  }, [errorMessageHandler, collisionAlertHandler]);
}

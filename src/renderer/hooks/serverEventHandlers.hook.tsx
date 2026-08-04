/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useContext, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import { ErrorMessage } from '../../shared/Types/ErrorMessage';
import { offServerEvent, onServerEvent } from '../IPC/OnServerEvent';
import { CollisionData } from 'shared/Types/CollisionData';

export default function useServerEventHandlers() {
  const errorMessageHandler = useCallback(
    (_event: IpcRendererEvent, err: ErrorMessage) => {
      console.error(`Error from server: ${err.stringMessage}`);
    },
    []
  );

  const collisionAlertHandler = useCallback(
    (_event: IpcRendererEvent, collision: CollisionData) => {
      console.log(`
        Collision! Between plane A: '${collision.planeA.id}' and Plane B: '${collision.planeB.id}'
        at latitude: ${collision.coordinates.lat} - longitude ${collision.coordinates.lon}, 
        at time: ${collision.time_of_collision}`
      );
      //<FlightPin lat={collision.coordinates.lat} lon={collision.coordinates.lon} />
    },
    []
  );

  useEffect(() => {
    onServerEvent('error_message', errorMessageHandler, false);
    onServerEvent('collision_alert', collisionAlertHandler, false);

    return () => {
      offServerEvent('error_message', errorMessageHandler);
      offServerEvent('collision_alert', collisionAlertHandler);
    };
  }, [errorMessageHandler, collisionAlertHandler]);
}

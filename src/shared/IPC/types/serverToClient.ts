/* eslint-disable prettier/prettier */
import { CollisionData } from 'shared/Types/CollisionData';
import { ErrorMessage } from 'shared/Types/ErrorMessage';

export interface IPC_PushNotification {
  error_message: {
    payload: ErrorMessage;
  };

  collision_alert: {
    payload: CollisionData;
  };
}

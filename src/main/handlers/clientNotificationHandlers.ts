import { BrowserWindow } from 'electron';
import emitToClient from '../IPC/EmitToClient';
import { ErrorMessage } from '../../shared/Types/ErrorMessage';
import { CollisionData } from 'shared/Types/CollisionData';

export function handleErrorMessage(
  browserWindow: BrowserWindow,
  data: ErrorMessage
): void {
  emitToClient(browserWindow, 'error_message', data);
}

export function handleCollisionAlert(
  browserWindow: BrowserWindow,
  data: CollisionData
): void {
  emitToClient(browserWindow, 'collision_alert', data);
}
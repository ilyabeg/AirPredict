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
  window: BrowserWindow, 
  data: CollisionData
): void {
  emitToClient(window, 'collision_alert', data);
}
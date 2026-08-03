import { BrowserWindow } from 'electron';
import emitToClient from '../IPC/EmitToClient';
import { ErrorMessage } from '../../shared/Types/ErrorMessage';

export function handleErrorMessage(
  browserWindow: BrowserWindow,
  data: ErrorMessage
): void {
  emitToClient(browserWindow, 'error_message', data);
}

export const WebSocketClientEvent = {
  AFTER_AUTH: 'afterAuth',
  ERROR: 'error',
} as const;

export type WebSocketClientEvent =
  (typeof WebSocketClientEvent)[keyof typeof WebSocketClientEvent];

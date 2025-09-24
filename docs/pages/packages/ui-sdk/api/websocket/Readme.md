# WebSocket API

This folder contains the WebSocket API implementation for the Webitel UI SDK.  
It includes configuration, client controller, and error event handling for WebSocket connections.  
Use these modules to manage real-time communication in your application.

## Configuration

The `config.js` file contains the default configuration settings for WebSocket connections.  
These settings include:

- **URL**: The WebSocket server endpoint.
- **Reconnection Policy**: Rules for reconnecting after a connection is lost.
- **Timeouts**: Time intervals for connection attempts and message acknowledgments.

You can customize these settings to suit your application's requirements.

## Modules

- **`WebSocketClientController.ts`**: Manages the lifecycle of WebSocket connections, including opening, closing, and sending messages.
- **`websocketErrorEventHandler.ts`**: Handles WebSocket error events and provides mechanisms for logging or retrying connections.

## Basic Usage

1. Import `webSocketClientController` into your application and use as `client`.
2. Call `client.getCliInstanse()`.
3. If you need specific `creatCliInstance` method for you case, pass it as a parameter into `getCliInstanse`.

This implementation ensures reliable and efficient real-time communication for your application.

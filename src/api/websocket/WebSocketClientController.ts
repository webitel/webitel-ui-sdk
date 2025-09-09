import { shallowReactive } from 'vue';
import { Client } from 'webitel-sdk';

import eventBus from '../../scripts/eventBus.js';
import { endpoint, getConfig } from './config.js';
import websocketErrorEventHandler from './websocketErrorEventHandler.js';

const WebSocketClientEvent = Object.freeze({
  AFTER_AUTH: 'afterAuth',
  ERROR: 'error',
});

class WebSocketClientController {
  cli = null;
  Event = WebSocketClientEvent;

  _config = getConfig();
  _on = {
    [WebSocketClientEvent.ERROR]: [websocketErrorEventHandler],
    [WebSocketClientEvent.AFTER_AUTH]: [],
  };

  getCliInstance(createCliInstance = this._createCliInstance) {
    if (!this.cli) this.cli = createCliInstance();
    return this.cli;
  }

  async destroyCliInstance() {
    if (!window.cli) return;

    await window.cli.destroy();
    this.cli = null;
    window.cli = null;
  }

  addEventListener(event, callback) {
    if (Array.isArray(callback))
      this._on[event] = this._on[event].concat(callback);
    else this._on[event].push(callback);
  }

  _createCliInstance = async () => {
    const token = localStorage.getItem('access-token');
    const configCli = getConfig();

    const config = {
      endpoint,
      token,
      registerWebDevice: configCli.registerWebDevice,
      debug: configCli.debug,
    };

    // why reactive? https://github.com/vuejs/core/discussions/7811#discussioncomment-5181921
    // const cli = new Client(config);
    const cli = shallowReactive(new Client(config));

    this._on[WebSocketClientEvent.AFTER_AUTH].forEach((callback) => callback());
    this._on[WebSocketClientEvent.ERROR].forEach((callback) =>
      cli.on('error', callback),
    );
    cli.on(`show_message`, (e) =>
      eventBus.$emit('notification', {
        type: e.type,
        text: e.message,
        timeout: e.timeout,
      }),
    );

    await cli.connect();

    await cli.auth();

    window.cli = cli;
    return cli;
  };
}

const webSocketClientController = new WebSocketClientController();

export default webSocketClientController;

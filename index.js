'use strict';

const debug = require('debug')('chaturbate:events');
const EventEmitter = require('events').EventEmitter;

const getTransforms = () => {
  const fs = require('fs');
  const path = require('path');
  const normalizedPath = path.join(__dirname, 'transforms');

  return fs.readdirSync(normalizedPath).map((file) => {
    debug(`loading transform '${file}'...`);
    return require("./transforms/" + file);
  });

  return transforms.filter((t) => !!t.event);
}

class ChaturbateEvents extends EventEmitter {
  constructor(browser, transforms=null) {
    super();
    this.browser = browser;
    this.browser.on('init', (params) => this._onInit(params));
    this.browser.on('connecting', () => this._onConnecting());
    this.browser.on('message', (params) => this._onMessage(params));
    this.browser.on('error', (error) => this._onError(error));
    this.browser.on('disconnected', (params) => this._onDisconnected(params));

    this.transforms = transforms || getTransforms();
    this.settings = null;
    this.chatSettings = null;
  }

  get names() {
    return this.transforms.map((t) => t.event);
  }

  _onInit(e) {
    debug('onInit');

    debug(e.settings);
    this.settings = e.settings;

    debug(e.chatSettings);
    this.chatSettings = e.chatSettings;

    if (!e.hasWebsocket) {
      debug('websocket not found, room is probably offline');
    }
  }

  _onConnecting() {
    debug('connecting...')
  }

  _onMessage(e) {
    debug(`onMessage: ${e.method}`);

    const transformed = this.transforms.some((t) => {
      if (t.method != e.method) return;
      if (t.match && !t.match.apply(this, e.args)) return;

      e.args.unshift(this);
      const result = t.transform.apply(this, e.args);

      if (result != null) {
        debug(`transformed to '${t.event}' event`)
        this.emit(t.event, result);
      }

      return true;
    });

    if (!transformed) {
      debug('unable to find matching transform')
      e.args.forEach((arg) => debug(arg));
    }
  }

  _onError(error) {
    debug('error')
    debug(error)
  }

  _onDisconnected(e) {
    debug('disconnected')
  }
  
}

module.exports = ChaturbateEvents;
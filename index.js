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
    this.browser.on('open', () => this._onOpen());
    this.browser.on('message', (params) => this._onMessage(params));
    this.browser.on('error', (error) => this._onError(error));
    this.browser.on('disconnected', (params) => this._onDisconnected(params));

    this.transforms = transforms || getTransforms();
  }

  get names() {
    return this.transforms.map((t) => t.event);
  }

  _onInit(e) {
    debug('onInit');
    this.emit('init', e);
  }

  _onOpen() {
    debug('open...')
    this.emit('socket_open');
  }

  _onMessage(e) {
    debug(`onMessage: ${e.method}`);

    const transformed = this.transforms.some((t) => {
      if (t.method != e.method) return;
      if (t.match && !t.match.apply(this, e.args)) return;

      const result = t.transform.apply(this, e.args);

      if (result != null) {
        debug(`transformed to '${t.event}' event`)
        this.emit(t.event, result);
      } else {
        debug(`transform '${t.event}' resulted in a noop`)
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
    this.emit('socket_error', error);
  }

  _onDisconnected(e) {
    debug('disconnected', e)
    this.emit('socket_disconnected');
  }
  
}

module.exports = ChaturbateEvents;
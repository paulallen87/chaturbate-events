'use strict';

const debug = require('debug')('chaturbate:events');
const EventEmitter = require('events').EventEmitter;

const getTransforms = () => {
  const fs = require('fs');
  const path = require('path');
  const normalizedPath = path.join(__dirname, 'transforms');
  const transforms = fs.readdirSync(normalizedPath).map((file) => {
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
    this.browser.on('close', (params) => this._onClose(params));

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
      if (t.callback && !t.callback.call(this, e.callback)) return;
  
      const result = t.transform.apply(this, e.args);

      debug(`transformed to '${t.event}' event`)
      this.emit(t.event, result);

      return true;
    });

    if (!transformed) {
      debug('unable to find matching transform')
      debug(e);
    }
  }

  _onError(error) {
    debug('error')
    this.emit('socket_error', error);
  }

  _onClose(e) {
    debug('close', e)
    this.emit('socket_close');
  }
  
}

module.exports = ChaturbateEvents;
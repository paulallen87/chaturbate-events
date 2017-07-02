'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('chaturbate:events');
const {EventEmitter} = require('events');

/**
 * Loads all known transforms.
 * 
 * @return {Array<*>}
 * @constant
 */
const getTransforms = () => {
  const normalizedPath = path.join(__dirname, 'transforms');
  const transforms = fs.readdirSync(normalizedPath).map((file) => {
    debug(`loading transform '${file}'...`);
    // eslint-disable-next-line global-require
    return require(`./transforms/${file}`);
  });

  return transforms.filter((t) => Boolean(t.event));
};

/**
 * Event manager for a Chaturbate Browser instance.
 */
class ChaturbateEvents extends EventEmitter {

  /**
   * Constructor.
   * 
   * @param {ChaturbateBrowser} browser 
   * @param {Array<*>=} transforms
   * @constructor
   * @extends EventEmitter
   */
  constructor(browser, transforms = null) {
    super();
    this.browser = browser;
    this.browser.on('init', (params) => this._onInit(params));
    this.browser.on('open', () => this._onOpen());
    this.browser.on('message', (params) => this._onMessage(params));
    this.browser.on('error', (error) => this._onError(error));
    this.browser.on('close', (params) => this._onClose(params));

    this.transforms = transforms || getTransforms();
  }

  /**
   * Gets a list of known event names.
   * 
   * @type {Array<string>}
   */
  get names() {
    return this.transforms.map((t) => t.event);
  }

  /**
   * Called when the browser is initialized.
   *
   * @param {Object} e
   * @private
   */
  _onInit(e) {
    debug('onInit');

    this.emit('init', e);
  }

  /**
   * Called when the websocket is open.
   *
   * @private
   */
  _onOpen() {
    debug('open...');

    this.emit('socket_open');
  }

  /**
   * Called when the websocket forwards a message.
   *
   * @param {Object} e
   * @private
   */
  _onMessage(e) {
    debug(`onMessage: ${e.method}`);

    const transformed = this.transforms.some((t) => {
      if (t.method !== e.method) return false;
      if (t.match && !t.match.apply(this, e.args)) return false;
      if (t.callback && !t.callback.call(this, e.callback)) return false;

      const result = t.transform.apply(this, e.args);

      debug(`transformed to '${t.event}' event`);
      this.emit(t.event, result);

      return true;
    });

    if (!transformed) {
      debug('unable to find matching transform');
      debug(e);
    }
  }

  /**
   * Called when the websocket throws and error.
   *
   * @param {Error} error
   * @private
   */
  _onError(error) {
    debug('error');

    this.emit('socket_error', error);
  }

  /**
   * Called when the websocket closes.
   *
   * @param {Event} e 
   * @private
   */
  _onClose(e) {
    debug('close', e);

    this.emit('socket_close', e);
  }

}

module.exports = ChaturbateEvents;

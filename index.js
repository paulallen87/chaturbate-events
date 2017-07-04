'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('chaturbate:events');
const {EventEmitter} = require('events');
const {Console} = require('console');
const logging = new Console(process.stdout, process.stderr);

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
    this.browser.on('hooked', (params) => this._onHooked(params));
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
    debug('initialized');

    this.emit('init', e);
  }

  /**
   * Called when the websocket has been hooked.
   *
   * @param {Object} e
   * @private
   */
  _onHooked(e) {
    debug('websocket hooked');

    this.emit('socket_hooked', e);
  }

  /**
   * Called when the websocket is open.
   *
   * @private
   */
  _onOpen() {
    debug('websocket open');

    this.emit('socket_open');
  }

  /**
   * Called when the websocket forwards a message.
   *
   * @param {Object} e
   * @private
   */
  _onMessage(e) {
    debug(`websocket message: ${e.method}`);

    const transformed = this.transforms.some((t) => {
      if (t.method !== e.method) return false;
      if (t.match && !t.match.apply(this, e.args)) return false;
      if (t.callback && !t.callback.call(this, e.callback)) return false;

      try {
        const result = t.transform.apply(this, e.args);
        debug(`transformed to '${t.event}' event`);
        debug(result);
        this.emit(t.event, result);
      } catch (err) {
        logging.error(`transform failed for '${e.event}'`);
        logging.error(err);
      }

      return true;
    });

    if (!transformed) {
      logging.warn('unable to find matching transform');
      logging.warn(e);
    }
  }

  /**
   * Called when the websocket throws and error.
   *
   * @param {Error} error
   * @private
   */
  _onError(error) {
    debug('websocket error', error);
    logging.error(error);
    this.emit('socket_error', error);
  }

  /**
   * Called when the websocket closes.
   *
   * @param {Event} e 
   * @private
   */
  _onClose(e) {
    debug('websocket close', e);

    this.emit('socket_close', e);
  }

}

module.exports = ChaturbateEvents;

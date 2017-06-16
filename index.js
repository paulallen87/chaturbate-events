const debug = require('debug')('chaturbate-events');
const EventEmitter = require('events').EventEmitter;
const cheerio = require('cheerio');

const getTransforms = () => {
  const glob = require('glob');
  const path = require('path');
  const transforms = glob.sync('./transforms/transform-*.js').map((file) => {
    return require(path.resolve(file));
  });

  return transforms.filter((t) => !!t.event);
}

class ChaturbateEvents extends EventEmitter {
  constructor(browser, transforms=null) {
    super();
    this.browser = browser;
    this.browser.on('page_load', () => this._onPageLoad);
    this.browser.on('child_inserted', () => this._onChildInserted);

    this.transforms = transforms || getTransforms();

    this.chatListNode = null;
    this.chatListNodes = null;
    this.chatOffline = null;
  }

  async _onPageLoad() {
    debug('onPageLoad');

    this.chatListNode = await this.browser.querySelector('.chat-list');
    debug(`chat node retrieved: ${this.chatListNode}`);

    this.chatListNodes = await this.browser.querySelectorAll('.chat-list > .text');
    debug(`chat list nodes retrieved: ${this.chatListNodes.length}`);

    this.chatOffline = await !!this.browser.querySelector('.offline_tipping');
    debug(`chat offline status retrieved: ${this.chatOffline}`);
  }

  _onChildInserted(e) {
    if (e.parentNodeId != this.chatListNode) return;

    const dom = cheerio.load(e.html, {
      withDomLvl1: true,
      normalizeWhitespace: true,
      xmlMode: false,
      decodeEntities: true
    });

    this._processDom(dom);
  }

  _processDom(dom) {
    const text = dom('.text');
    let found = false;

    found = this.transforms.some((t) => {
      if (!t.event) return;
      if (!t.selector) return;
      if (!text.has(t.selector).length) return;

      debug(`transforming '${t.event}' event...`);

      this.emit(t.event, t.transform(text));
      return true;
    });

    if (found) return;

    found = this.transforms.some((t) => {
      if (!t.event) return;
      if (!t.regex) return;
      if (!t.regex.test(text.text())) return;

      debug(`transforming '${t.event}' event...`)

      this.emit(t.event, t.transform(text));
      return true;
    });

    if (!found) {
      console.warn(text.html())
    }
  }  
}

module.exports = ChaturbateEvents;
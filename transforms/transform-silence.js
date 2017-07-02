'use strict';

module.exports = {
  event: 'silence',
  method: 'onSilence',
  transform: (silencedNick, silencerNick) => {
    return {
      silencedNick: silencedNick,
      silencerNick: silencerNick,
    };
  },
};

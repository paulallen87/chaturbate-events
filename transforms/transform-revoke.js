'use strict';

module.exports = {
  event: 'revoke',
  method: 'onRevoke',
  transform: (toNick, fromNick) => {
    return {
      toNick: toNick,
      fromNick: fromNick,
    };
  },
};

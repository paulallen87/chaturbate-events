'use strict';

module.exports = {
  event: 'promotion',
  method: 'onPromotion',
  transform: (toNick, fromNick) => {
    return {
      toNick: toNick,
      fromNick: fromNick,
    };
  },
};

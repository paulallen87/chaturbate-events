'use strict';

module.exports = {
  event: 'receive_tip',
  method: 'onNotifyTipAlert',
  transform: (amount, fromUsername, toUsername, message, history) => {
    return {
      amount: amount,
      fromUsername: fromUsername,
      toUsername: toUsername,
      message: message,
      history: history,
    };
  },
};

'use strict';

module.exports = {
  event: 'token_balance_update',
  method: 'onNotifyTokenBalanceUpdate',
  transform: (usernames, tokenAmounts) => {
    return {
      usernames: usernames,
      tokenAmounts: tokenAmounts,
    };
  },
};

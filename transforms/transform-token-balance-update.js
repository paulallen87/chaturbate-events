module.exports = {
  event: 'token_balance_update',
  method: 'onNotifyTokenBalanceUpdate',
  transform: (usernames, token_amounts) => {
    return {
      usernames: usernames,
      tokenAmounts: token_amounts
    };
  }
};
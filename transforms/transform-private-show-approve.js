module.exports = {
  event: 'private_show_approve',
  method: 'onNotifyPrivateShowApprove',
  transform: (self, tokens_per_minute) => {
    return {
      tokensPerMinute: tokens_per_minute
    };
  }
};
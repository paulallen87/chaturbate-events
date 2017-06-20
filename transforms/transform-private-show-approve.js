module.exports = {
  event: 'private_show_approve',
  method: 'onNotifyPrivateShowApprove',
  transform: (tokens_per_minute) => {
    return {
      tokensPerMinute: tokens_per_minute
    };
  }
};
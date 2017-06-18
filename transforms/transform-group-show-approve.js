module.exports = {
  event: 'group_show_approve',
  method: 'onNotifyGroupShowApprove',
  transform: (self, tokens_per_minute) => {
    return {
      tokensPerMinute: tokens_per_minute
    };
  }
};
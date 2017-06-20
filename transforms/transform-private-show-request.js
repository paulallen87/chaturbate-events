module.exports = {
  event: 'private_show_request',
  method: 'onNotifyPrivateShowRequest',
  transform: (requester_username, tokens_per_minute) => {
    return {
      requesterUsername: requester_username,
      tokensPerMinute: tokens_per_minute
    };
  }
};
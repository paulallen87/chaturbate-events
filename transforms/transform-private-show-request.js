'use strict';

module.exports = {
  event: 'private_show_request',
  method: 'onNotifyPrivateShowRequest',
  transform: (requesterUsername, tokensPerMinute) => {
    return {
      requesterUsername: requesterUsername,
      tokensPerMinute: tokensPerMinute,
    };
  },
};

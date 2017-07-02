'use strict';

module.exports = {
  event: 'private_show_approve',
  method: 'onNotifyPrivateShowApprove',
  transform: (tokensPerMinute) => {
    return {
      tokensPerMinute: tokensPerMinute,
    };
  },
};

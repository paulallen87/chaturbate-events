'use strict';

module.exports = {
  event: 'group_show_approve',
  method: 'onNotifyGroupShowApprove',
  transform: (tokensPerMinute) => {
    return {
      tokensPerMinute: tokensPerMinute,
    };
  },
};

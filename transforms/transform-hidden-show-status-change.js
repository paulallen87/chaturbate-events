'use strict';

module.exports = {
  event: 'hidden_show_status_change',
  method: 'onNotify',
  match: (data) => data.type === 'hidden_show_status_change',
  transform: (isStarting) => {
    return {
      isStarting: isStarting,
    };
  },
};

'use strict';

module.exports = {
  event: 'send_kick_message',
  method: 'callback',
  callback: (int) => int === 4,
  transform: (success) => {
    return {
      'success': success,
    };
  },
};

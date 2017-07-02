'use strict';

module.exports = {
  event: 'send_room_message',
  method: 'callback',
  callback: (int) => int === 2,
  transform: (success) => {
    return {
      'success': success,
    };
  },
};

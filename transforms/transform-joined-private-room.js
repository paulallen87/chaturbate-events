'use strict';

module.exports = {
  event: 'joined_private_room',
  method: 'callback',
  callback: (int) => int === 5,
  transform: (success) => {
    return {
      'success': success,
    };
  },
};

'use strict';

module.exports = {
  event: 'joined_room',
  method: 'callback',
  callback: (int) => int === 6,
  transform: (success) => {
    return {
      'success': success,
    };
  },
};

'use strict';

module.exports = {
  event: 'joined_room',
  method: 'callback',
  callback: (int) => int === 1,
  transform: (success) => {
    return {
      'success': success,
    };
  },
};

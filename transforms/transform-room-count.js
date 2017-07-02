'use strict';

module.exports = {
  event: 'room_count',
  method: 'onRoomCountUpdate',
  transform: (count) => {
    return {
      count: count,
    };
  },
};

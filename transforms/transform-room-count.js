module.exports = {
  event: 'room_count',
  method: 'onRoomCountUpdate',
  transform: (self, count) => {
    return {
      count: count
    };
  }
};
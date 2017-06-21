module.exports = {
  event: 'joined_room',
  method: 'callback',
  callback: (int) => int == 6, // onLeaveRoomResponse
  transform: (success) => {
    return {
      'success': success
    };
  }
};
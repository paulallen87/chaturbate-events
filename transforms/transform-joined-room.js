module.exports = {
  event: 'joined_room',
  method: 'callback',
  callback: (int) => int == 1, // onJoinRoomResponse
  transform: (success) => {
    return {
      'success': success
    };
  }
};
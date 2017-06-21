module.exports = {
  event: 'send_room_message',
  method: 'callback',
  callback: (int) => int == 2, // onSendRoomMsgResponse
  transform: (success) => {
    return {
      'success': success
    };
  }
};
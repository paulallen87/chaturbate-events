module.exports = {
  event: 'send_kick_message',
  method: 'callback',
  callback: (int) => int == 4, // onSendKickMsgResponse
  transform: (success) => {
    return {
      'success': success
    };
  }
};
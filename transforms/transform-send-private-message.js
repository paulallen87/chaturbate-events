module.exports = {
  event: 'send_private_message',
  method: 'callback',
  callback: (int) => int == 3, // onSendPrivateMsgResponse
  transform: (success) => {
    return {
      'success': success
    };
  }
};
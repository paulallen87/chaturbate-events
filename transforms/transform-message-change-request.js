module.exports = {
  event: 'message_change_request',
  method: 'onNotifyMessageChangeRequest',
  transform: (subject) => {
    return {
      subject: subject
    };
  }
};
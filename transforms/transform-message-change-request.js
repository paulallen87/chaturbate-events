module.exports = {
  event: 'message_change_request',
  method: 'onNotifyMessageChangeRequest',
  transform: (self, subject) => {
    return {
      subject: subject
    };
  }
};
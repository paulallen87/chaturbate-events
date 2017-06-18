module.exports = {
  event: 'leave_private_room',
  method: 'onNotifyLeavePrivateRoom',
  transform: (self, username) => {
    return {
      username: username
    };
  }
};
const transformUser = require('./transform-user');

module.exports = {
  event: 'room_leave',
  method: 'onNotify',
  match: (data) => data.type == 'room_leave',
  transform: (data) => {
    return {
      user: transformUser(data)
    };
  }
};
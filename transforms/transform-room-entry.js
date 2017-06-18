const transformUser = require('./transform-user');

module.exports = {
  event: 'room_entry',
  method: 'onNotify',
  match: (data) => data.type == 'room_entry',
  transform: (self, data) => {
    return {
      user: transformUser(self, data)
    };
  }
};
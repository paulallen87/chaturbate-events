'use strict';

const transformUser = require('./transform-user');

module.exports = {
  event: 'room_entry',
  method: 'onNotify',
  match: (data) => data.type === 'room_entry',
  transform: (data) => {
    return {
      user: transformUser(data),
    };
  },
};

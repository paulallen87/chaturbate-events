'use strict';

module.exports = {
  event: 'kick',
  method: 'onKick',
  transform: (username) => {
    return {
      username: username,
    };
  },
};

'use strict';

const transformUser = require('./transform-user');
const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'private_message',
  method: 'onPrivateMsg',
  transform: (fromNick, data, tabNick) => {
    let userData = data;
    if (typeof data === 'string') {
      userData = {
        m: data,
      };
    }

    return {
      tabNick: tabNick,
      user: transformUser(userData, fromNick),
      message: transformEmoticons(userData.m),
    };
  },
};

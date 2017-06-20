const transformUser = require('./transform-user');
const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'private_message',
  method: 'onPrivateMsg',
  transform: (from_nick, data, tab_nick) => {
    if (typeof data == 'string') {
      data = {
        m: data
      }
    }

    return {
      tabNick: tab_nick,
      user: transformUser(data, from_nick),
      message: transformEmoticons(data.m)
    };
  }
};
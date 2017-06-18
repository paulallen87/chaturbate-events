const transformUser = require('./transform-user');
const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'private_message',
  method: 'onPrivateMsg',
  transform: (self, from_nick, data, tab_nick) => {
    if (typeof data == 'string') {
      data = {
        m: data
      }
    }

    return {
      tabNick: tab_nick,
      user: transformUser(self, data, from_nick),
      message: transformEmoticons(data.m)
    };
  }
};
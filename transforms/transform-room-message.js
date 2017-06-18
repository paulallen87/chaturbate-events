const transformUser = require('./transform-user');
const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'room_message',
  method: 'onRoomMsg',
  transform: (self, username, data) => {
    return {
      message: transformEmoticons(data.m),
      user: transformUser(self, data)
    };
  }
};
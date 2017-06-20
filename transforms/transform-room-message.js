const transformUser = require('./transform-user');
const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'room_message',
  method: 'onRoomMsg',
  transform: (username, data) => {
    return {
      message: transformEmoticons(data.m),
      user: transformUser(data)
    };
  }
};
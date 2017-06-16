const transformMessageContent = require('./transform-message-content');
const ROOM_SUBJECT_REGEX = /room subject changed to "(.*?)"/;

module.exports = {
  event: 'room_message',
  selector: '.roommessagelabel',
  transform: (dom) => {
    let message = dom.find('.roommessagelabel');
    message = transformMessageContent(message);
    message = message.match(ROOM_SUBJECT_REGEX)[1];

    return {
      message: message
    };
  }
};
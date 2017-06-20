const transformUser = require('./transform-user');
const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'receive_tip',
  method: 'onNotifyTipAlert',
  transform: (amount, from_username, to_username, message, history) => {
    return {
      amount: amount,
      fromUsername: from_username,
      toUsername: to_username,
      message: message,
      history: history
    };
  }
};
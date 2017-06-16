const transformUser = require('./transform-user');
const transformMessageContent = require('./transform-message-content');

module.exports = {
  event: 'message',
  selector: '.messagelabel',
  transform: (dom) => {
    const username = dom.find('.username');

    username.remove();

    this.emit('message', {
      user: transformUser(username),
      message: transformMessageContent(dom)
    });
  }
};
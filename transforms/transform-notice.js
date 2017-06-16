const transformMessageContent = require('./transform-message-content');
const NOTICE_REGEX = /^Notice: (.*?)$/;

module.exports = {
  event: 'notice',
  regex: NOTICE_REGEX,
  transform: (dom) => {
    const message = transformMessageContent(dom);
    const matches = message.match(NOTICE_REGEX);

    return {
      message: matches[1]
    }
  }
};
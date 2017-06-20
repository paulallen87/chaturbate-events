const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'title_change',
  method: 'onTitleChange',
  transform: (title, show_in_chat) => {
    return {
      title: transformEmoticons(title),
      showInChat: show_in_chat
    };
  }
};
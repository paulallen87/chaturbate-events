const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'title_change',
  method: 'onTitleChange',
  transform: (self, title, show_in_chat) => {
    if (title == '') {
      title = self.chatSettings.current_subject;
    } else {
      self.chatSettings.current_subject = title;
    }
    return {
      title: transformEmoticons(title),
      showInChat: show_in_chat
    };
  }
};
'use strict';

const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'title_change',
  method: 'onTitleChange',
  transform: (title, showInChat) => {
    return {
      title: transformEmoticons(title),
      showInChat: showInChat,
    };
  },
};

'use strict';

const EMOTICON_REGEX = /%%%\[emoticon (.*?)\|.*?\|\d+\|\d+\|.*?\]%%%/g;

module.exports = (txt) => {
  return txt.replace(EMOTICON_REGEX, '($1)');
};

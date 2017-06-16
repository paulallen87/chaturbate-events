const SILENCE_REGEX = /User (.*?) was silenced by (.*?) and his\/her messages have been removed/;

module.exports = {
  event: 'silence',
  regex: SILENCE_REGEX,
  transform: (dom) => {
    const matches = dom.text().match(SILENCE_REGEX);

    return {
      target: matches[1],
      source: matches[2]
    }
  }
};
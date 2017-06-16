const KICK_REGEX = /User (.*?) was kicked out of the room and his\/her messages have been removed/;

module.exports = {
  event: 'kick',
  regex: KICK_REGEX,
  transform: (dom) => {
    const matches = dom.text().match(KICK_REGEX);

    return {
      target: matches[1]
    }
  }
};
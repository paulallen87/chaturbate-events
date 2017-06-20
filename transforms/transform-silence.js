module.exports = {
  event: 'silence',
  method: 'onSilence',
  transform: (silenced_nick, silencer_nick) => {
    return {
      silencedNick: silenced_nick,
      silencerNick: silencer_nick
    };
  }
};
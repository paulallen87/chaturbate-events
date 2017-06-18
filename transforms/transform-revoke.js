module.exports = {
  event: 'revoke',
  method: 'onRevoke',
  transform: (self, to_nick, from_nick) => {
    return {
      toNick: to_nick,
      fromNick: from_nick
    };
  }
};
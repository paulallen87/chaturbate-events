module.exports = (self, user, username=null) => {
  username = username || user.user || user.username || user.from_username;
  return {
    'username': username,
    'isHost': username == self.settings.room,
    'isMod': user.is_mod || false,
    'inFanclub': user.in_fanclub || false,
    'hasTokens': user.has_tokens || false,
    'tippedAlotRecently': user.tipped_alot_recently || false,
    'tippedTonsRecently': user.tipped_tons_recently || false,
    'tippedTecently': user.tipped_recently || false,
    'gender': user.gender || undefined,
    'fontColor': (!user.c || user.c == 'default') ? undefined : user.c,
    'fontFamily': (!user.f || user.f == 'default') ? undefined : user.f
  };
}
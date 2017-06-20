module.exports = {
  event: 'group_show_request',
  method: 'onNotifyGroupShowRequest',
  transform: (users_waiting, users_required, tokens_per_minute) => {
    return {
      usersWaiting: users_waiting,
      usersRequired: users_required,
      tokensPerMinute: tokens_per_minute
    };
  }
};
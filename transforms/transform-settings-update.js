module.exports = {
  event: 'settings_update',
  method: 'onNotify',
  match: (data) => data.type == 'settingsupdate',
  transform: (data) => {
    return {
      allowPrivates: data.allow_privates,
      allowGroups: data.allow_groups,
      minimumUsersForGroupShow: data.minimum_users_for_group_show,
      privatePrice: data.private_price,
      groupPrice: data.group_price,
      spyPrice: data.spy_price
    };
  }
};
const transformUser = require('./transform-user');

module.exports = {
  event: 'tip',
  method: 'onNotify',
  match: (data) => data.type == 'tip_alert',
  transform: (data) => {
    return {
      amount: data.amount,
      user: transformUser(data)
    };
  }
};
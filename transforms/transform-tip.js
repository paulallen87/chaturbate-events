
const transformUser = require('./transform-user');
const TIP_REGEX = / tipped (\d+) tokens?/;

module.exports = {
  event: 'tip',
  selector: '.tipalert'
  transform: (dom) => {
    const tip = dom.find('.tipalert');
    const username = tip.find('.username');

    username.remove();

    const amount = tip.text().match(TIP_REGEX);

    return {
      user: transformUser(username),
      amount: parseInt(amount[1])
    };
  }
}
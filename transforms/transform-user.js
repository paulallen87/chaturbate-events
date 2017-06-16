const transformUserType = require('./transform-user-type')

module.exports = (dom) => {
  return {
    username: dom.data('nick'),
    type: transformUserType(dom)
  }
}
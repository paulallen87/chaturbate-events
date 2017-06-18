module.exports = {
  event: 'log',
  method: 'onNotify',
  match: (data) => data.type == 'log',
  transform: (self, data) => {
    return {
      message: data.msg
    };
  }
};
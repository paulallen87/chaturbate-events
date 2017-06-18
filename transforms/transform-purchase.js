module.exports = {
  event: 'purchase',
  method: 'onNotify',
  match: (data) => data.type == 'purchase_notification',
  transform: (self, data) => {
    return {
      message: data.message
    };
  }
};
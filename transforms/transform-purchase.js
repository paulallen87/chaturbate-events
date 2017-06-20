module.exports = {
  event: 'purchase',
  method: 'onNotify',
  match: (data) => data.type == 'purchase_notification',
  transform: (data) => {
    return {
      message: data.message
    };
  }
};
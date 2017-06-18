module.exports = {
  event: 'personally_kicked',
  method: 'onPersonallyKicked',
  transform: (self, reason) => {
    return {
      reason: reason
    };
  }
};
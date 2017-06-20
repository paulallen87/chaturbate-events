module.exports = {
  event: 'personally_kicked',
  method: 'onPersonallyKicked',
  transform: (reason) => {
    return {
      reason: reason
    };
  }
};
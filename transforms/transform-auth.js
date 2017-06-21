module.exports = {
  event: 'auth',
  method: 'onAuthResponse',
  transform: (success) => {
    return {
      success: !!success
    };
  }
};
module.exports = {
  event: 'app_error_log',
  method: 'onNotify',
  match: (data) => data.type == 'apperrorlog',
  transform: (self, data) => {
    return {
      'message': data.msg
    };
  }
};
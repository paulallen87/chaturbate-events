module.exports = {
  event: 'refresh_panel',
  method: 'onNotify',
  match: (data) => data.type == 'refresh_panel',
  transform: (self, data) => {
    return undefined;
  }
};
'use strict';

module.exports = {
  event: 'app_tab_refresh',
  method: 'onNotify',
  match: (data) => data.type === 'app_tab_refresh',
  transform: (data) => undefined,
};

const transformEmoticons = require('./transform-emoticons');

module.exports = {
  event: 'app_notice',
  method: 'onNotify',
  match: (data) => data.type == 'appnotice',
  transform: (self, data) => {
    return {
      messages: (data.msg || []).map((m) => transformEmoticons(m)),
      foreground: data.foreground || '#000000',
      weight: data.weight || 'normal',
      background: data.background || 'transparent',
      to: data.to_user || undefined 
    };
  }
};
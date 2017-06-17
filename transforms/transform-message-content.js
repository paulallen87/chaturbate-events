const cheerio = require('cheerio');

module.exports = (dom) => {
  dom.find('.facebox_link img[title]').each((index, el) => {
    const image = cheerio(el);
    const title = image.attr('title').replace(':', '')
    image.replaceWith(`(${title})`);
  })

  let text = dom.text();
  text = text.replace(/^\*.*?\*\s+\|\d+\| /, '');
  text = text.replace(/^\|\d+\| /, '');
  return text;
};
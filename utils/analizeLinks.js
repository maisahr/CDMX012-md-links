const marked = require('marked');
const cheerio = require('cheerio');
const axios = require('axios');

const mdToHTML = (data, file, linksArray) => {
    const dataHTML = marked.parse(data);

    const $ = cheerio.load(dataHTML);
  
    $('a').each((i, link) => {
      const linkHref = link.attribs.href;
      if(linkHref !== undefined && linkHref.includes('http') === true) {
        const text = $(link).text();
        const linkObject = {
          href: linkHref,
          text: text,
          file: file
        }
        linksArray.push(linkObject);
        return linksArray;
      }
    });
}
  
const validation = (link) => {

    return axios.get(link.href)
    .then(response => {
       link.status = response.status;
       link.ok = 'satisfactorio';
       return link;
    })
    .catch(e => {
        if (e.response) {
          link.status = e.response.status;
          link.ok = 'fallido';
          return link;
        }
    })
}
  
module.exports = {
  mdToHTML,
  validation,
}
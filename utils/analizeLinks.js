const marked = require('marked');
const cheerio = require('cheerio');
const axios = require('axios');

const mdToHTML = (data, file, arrayPromise) => {
    const toHTML = marked.parse(data);
  
    const $ = cheerio.load(toHTML);
  
    $('a').each((i, link) => {
      const linkHref = link.attribs.href;
      if(linkHref.includes('http') === true) {
        const text = $(link).text();
        const aObject = {
          href: linkHref,
          text: text,
          file: file
        }
        arrayPromise.push(aObject);
        return arrayPromise;
      }
    });
}
  
const validation = (link, aObject) => {

    return axios.get(link)
    .then(response => {
       aObject.status = response.status;
       return aObject;
    })
    .catch(e => {
        if (e.response) {
          return aObject.status = e.response.status;
        }
    })
}
  
module.exports = {
  mdToHTML,
  validation,
}
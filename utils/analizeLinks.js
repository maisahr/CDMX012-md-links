const marked = require('marked');
const cheerio = require('cheerio');
const axios = require('axios');

const mdToHTML = (data, file, arrayTry) => {
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
        arrayTry.push(aObject);
        return arrayTry;
      }
    });
}
  
const validation = (link, aObject) => {

  if(options.validate === false){
    return console.log(aObject);
  } else {
    axios.get(link)
    .then(response => {
        aObject.status = response.status;
        return console.log(aObject);
    })
    .catch(e => {
        if (e.response) {
            aObject.status = e.response.status;
            return console.log(aObject);
        }
    })
  }
}
  
module.exports = mdToHTML;
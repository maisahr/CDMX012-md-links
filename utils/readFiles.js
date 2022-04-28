const fs = require('fs');
const path = require('path');
const marked = require('marked');
const cheerio = require('cheerio');
const axios = require('axios');

// Lee un documento
const readAFile = (file, options) => {
  if(path.extname(file) === '.md'){
    return mdToHTML(fs.readFileSync(file, 'utf8'), file, options);
  }
};

// Lee documentos dentro de la carpeta
const readDirectory = (directory) => {
  const files = fs.readdirSync(directory, 'utf8');
  newFilesPath = files.map(file => {
    const filePath = path.join(directory, file);
    return filePath;
  });
  return newFilesPath;
}

const mdToHTML = (data, file, options) => {
  const toHTML = marked.parse(data);

  const $ = cheerio.load(toHTML);

  $('a').each((i, link) => {
    const linkHref = link.attribs.href;
    if(linkHref.includes('http') === true) {
      const aText = $(link).text();
      const aObject = {
        href: linkHref,
        text: aText,
        file: file
      }
      if(options.validate === false){
        return console.log(aObject);
      } else {
        axios.get(linkHref)
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
  });
}

module.exports = { 
  readAFile,
  readDirectory,
  mdToHTML
};
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const cheerio = require('cheerio');

// Lee un documento
const readAFile = (file) => {
  if(path.extname(file) === '.md'){
    return mdToHTML(fs.readFileSync(file, 'utf8'), file);
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

const mdToHTML = (data, file) => {
  const toHTML = marked.parse(data);

  const $ = cheerio.load(toHTML);

  $('a').each((i, link) => {
    const linkHref = link.attribs.href;
    if(linkHref.includes('https') === true) {
      const aText = $(link).text();
      const aObject = {
        href: linkHref,
        text: aText,
        file: file
      }
      return console.log(aObject);
    }
  });
}

module.exports = { 
  readAFile,
  readDirectory,
  mdToHTML
};
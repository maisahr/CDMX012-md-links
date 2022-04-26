const fs = require('fs');
const path = require('path');
const marked = require('marked');
const cheerio = require('cheerio');

// Lee un documento
const readAFile = (file) => {
  if(path.extname(file) === '.md') {
    fs.readFile(file, 'utf8', (err, data) => {
      if(err) {
        return console.log('No pudimos leer la ruta ' + file + '. Por favor verificala y vuelve a intentar.');
      }
      return mdToHTML(data);
    });
  }
};

// Lee documentos dentro de la carpeta
const readDirectory = (directory) => {
  fs.readdir(directory, 'utf8', (err, files) => {
    if(err) {
      return console.log('No pudimos encontrar la ruta ' + directory + '. Por favor verificala y vuelve a intentar.');
    }

    files.forEach(file => {
      const filePath = path.join(directory, file);
      readAFile(filePath);
    });
  });
}

const mdToHTML = (data) => {
  const toHTML = marked.parse(data);

  const $ = cheerio.load(toHTML);

  $('a').each((i, link) => {
    const linkHref = link.attribs.href;
    if(linkHref.includes('https') === true) {
      const aText = $(link).text();
      const aObject = {
        href: linkHref,
        text: aText
      }
      return console.log(aObject);
    }
  });
}

module.exports = { 
  readAFile,
  readDirectory
};
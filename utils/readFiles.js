const fs = require('fs');
const path = require('path');
const {mdToHTML} = require('./analizeLinks');

// Lee un documento
const readAFile = (file, linksArray) => {
  if(path.extname(file) === '.md'){
    return mdToHTML(fs.readFileSync(file, 'utf8'), file, linksArray);
  } 
};

// Lee documentos dentro de la carpeta
const readDirectory = (directory) => {
  const files = fs.readdirSync(directory, 'utf8');
  filesNewPath = files.map(file => {
    const newFilePath = path.join(directory, file);
    return newFilePath;
  });
  return filesNewPath;
}

module.exports = { 
  readAFile,
  readDirectory,
};
const fs = require('fs');
const path = require('path');
const mdToHTML = require('./analizeLinks');

// Lee un documento
const readAFile = (file, arrayTry) => {
  if(path.extname(file) === '.md'){
    return mdToHTML(fs.readFileSync(file, 'utf8'), file, arrayTry);
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

module.exports = { 
  readAFile,
  readDirectory,
};
const fs = require('fs');
const path = require('path');
const {mdToHTML} = require('./analizeLinks');

const readAFile = (file, linksArray) => {
  if(path.extname(file) === '.md'){
    return mdToHTML(fs.readFileSync(file, 'utf8'), file, linksArray);
  } else {
    console.log(file, 'no es un archivo markdown.\n');
  }
};

const readDirectory = (directory) => {
  const files = fs.readdirSync(directory, 'utf8');
  filesNewPath = files.map(file => {
    const correctPath = path.join(directory, file);
    return correctPath;
  });
  return filesNewPath;
}

const recursion = (absolutePath, linksArray) => {
  if(fs.lstatSync(absolutePath).isDirectory() === true) {
      readDirectory(absolutePath).forEach(file => {
          recursion(file, linksArray);
      });
  } else {
      readAFile(absolutePath, linksArray);
  };
};

module.exports = {
  readAFile,
  readDirectory,
  recursion
}
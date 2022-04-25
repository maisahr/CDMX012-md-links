const fs = require('fs');
const path = require('path');

const getExtension = (file) => path.extname(file);

const readFile = (file) => {
  if(getExtension(file) === '.md') {
    fs.readFile(file, 'utf8', (err, data) => {
      if(err) {
        return console.log(err);
      }
      console.log('leo un archivo md', file);
    });
  } else {
    console.log('esto no es un .md');
  }
};

module.exports = readFile;
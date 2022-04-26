const fs = require('fs');
const path = require('path');

// Lee un documento
const readFile = (file) => {
  if(path.extname(file) === '.md') {
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

// Lee documentos dentro de la carpeta
const readDirectory = (directory) => {
  fs.readdir(directory, 'utf8', (err, files) => {
    if(err) {
      console.log(err);
    }

    files.forEach(file => {
      const filePath = path.join(directory, file);
      readFile(filePath);
    });
  });
}

module.exports = { 
  readDirectory,
  readFile
};
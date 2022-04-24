const fs = require('fs');
const path = require('path');
const readFile = require('./readFile.js')

// Indetifica si la ruta es una carpeta
const directoryOrFile = (userPath) => {
    return fs.lstatSync(userPath).isDirectory() 
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
  directoryOrFile,
  readDirectory
};
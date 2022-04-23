const fs = require('fs');
const readFile = require('./readFile.js')

const directoryOrFile = (path) => {
    // Pregunta si la ruta es un directorio 
    fs.stat(path, (err, stats) => {
        if (err) {
          console.log(err);
        }
        
        const isDirectory = stats.isDirectory();
        console.log(isDirectory);
    
        // Lee documentos dentro de la carpeta
        if(isDirectory === true) {
          fs.readdir(path, 'utf8', (err, files) => {
            if(err) {
              console.log(err);
            }
    
            // Filtra documentos por extensión .md y lee
            console.log(files);
            files.forEach(file => readFile(file));
          });
        }
    
        // Pregunta si la extensión del archivo es md y lee
        else {
          readFile(path);
        };
    });
};

module.exports = directoryOrFile;
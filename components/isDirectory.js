const directoryOrFile = (path, ext) => {
    const fs = require('fs');
    const readFile = require('./readFile.js')

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
            files.forEach(file => readFile(file, ext));
          });
        }
    
        // Pregunta si la extensión del archivo es md y lee
        else {
          readFile(path, ext);
        };
    });
};

module.exports = directoryOrFile;
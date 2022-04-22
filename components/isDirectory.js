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
    
            // Filtra documentos por extensión .md
            const filesMd = files.filter(file => ext(file) === '.md');
            filesMd.forEach(file => {
                readFile(file);
            });
          });
        }
    
        // Pregunta si la extensión del archivo es md
        else {
          if(ext(path) === '.md'){
            readFile(path);
          };
        };
    });
};

module.exports = directoryOrFile;
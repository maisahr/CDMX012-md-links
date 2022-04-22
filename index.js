module.exports = (userPath) => {
  const path = require('path');
  const fs = require('fs');

  // Vuelve la ruta a absoluta.
  const pathAbsolute = path.resolve(userPath);
  const ext = path.extname(pathAbsolute);
  console.log(pathAbsolute);

  // Pregunta si la ruta es un directorio 
  fs.stat(pathAbsolute, (err, stats) => {
    if (err) {
      console.log(err);
    }
    
    const isDirectory = stats.isDirectory();
    console.log(isDirectory);

    // Lee documentos dentro de la carpeta
    if(isDirectory === true) {
      fs.readdir(pathAbsolute, 'utf8', (err, files) => {
        if(err) {
          console.log(err);
        }

        // Filtra documentos por extensión .md
        const filesMd = files.filter(file => path.extname(file) === '.md');
        console.log(filesMd);
      });
    } 

    // Pregunta si la extensión del archivo es md
    else {
      if(ext === '.md'){
        fs.readFile(userPath, 'utf8', (err, data) => {
          if(err) {
            return console.log(err);
          };
          console.log('se logra');
        });
      }
    }
  });
};

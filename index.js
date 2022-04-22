module.exports = (userPath) => {
  const path = require('path');
  const directoryOrFile = require('./components/isDirectory.js')

  // Vuelve la ruta a absoluta.
  const pathAbsolute = path.resolve(userPath);
  const ext = (file) => path.extname(file);
  console.log(pathAbsolute);

  directoryOrFile(pathAbsolute, ext);
};

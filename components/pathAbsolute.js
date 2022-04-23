const path = require('path');
const directoryOrFile = require('./directoryOR.js')

module.exports = (userPath) => {
  // Vuelve la ruta a absoluta.
  const pathAbsolute = path.resolve(userPath);
  console.log(pathAbsolute);

  directoryOrFile(pathAbsolute);
  console.log(typeof directoryOrFile, 'index');
};

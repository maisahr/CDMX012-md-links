const path = require('path');

// Vuelve la ruta a absoluta.
const getAbsolutePath = (userPath) => {
  const pathAbsolute = path.resolve(userPath);
  console.log(pathAbsolute);
  return pathAbsolute;
};

module.exports = getAbsolutePath;

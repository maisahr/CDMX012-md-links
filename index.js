const getAbsolutePath = require('./utils/pathAbsolute.js');
const {directoryOrFile, readDirectory} = require('./utils/directoryOR.js');
const readFile = require('./utils/readFile.js');

const pathAbsolute = getAbsolutePath(process.argv[2]);

if(directoryOrFile(pathAbsolute) === true) {
    readDirectory(pathAbsolute);
} else {
    readFile(pathAbsolute);
}

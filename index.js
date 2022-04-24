const getAbsolutePath = require('./components/pathAbsolute.js');
const {directoryOrFile, readDirectory} = require('./components/directoryOR.js');
const readFile = require('./components/readFile.js');

const pathAbsolute = getAbsolutePath(process.argv[2]);

if(directoryOrFile(pathAbsolute) === true) {
    readDirectory(pathAbsolute);
} else {
    readFile(pathAbsolute);
}

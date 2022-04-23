const fs = require('fs');
const path = require('path');
const directoryOrFile = require('./directoryOR.js');
const getExtension = (file) => path.extname(file);

const readFile = (file) => {
    console.log(typeof directoryOrFile, 'readFile 1');
    if(getExtension(file) === '.md') {
        fs.readFile(file, 'utf8', (err, data) => {
            if(err) {
                return console.log(err);
            }

            console.log('leo un archivo md', file);
        });
    } else {
        directoryOrFile(file);
    }
};

module.exports = readFile;
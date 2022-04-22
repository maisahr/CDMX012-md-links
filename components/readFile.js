const readFile = (file) => {
    const fs = require('fs');

    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            return console.log(err);
        }

        console.log('leo un archivo md');
    });
};

module.exports = readFile;
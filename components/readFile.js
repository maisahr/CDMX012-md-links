const readFile = (file, ext) => {
    const fs = require('fs');

    if(ext(file) === '.md') {
        fs.readFile(file, 'utf8', (err, data) => {
            if(err) {
                return console.log(err);
            }

            console.log('leo un archivo md');
        });
    }
};

module.exports = readFile;
const mdLinks = require('./mdLinks.js');

const object = {validate: true};
mdLinks(process.argv[2], object)
.then(result => {
    console.log(result);
})
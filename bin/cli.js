#!/usr/bin/env node
const yargs = require('yargs');
const mdLinks = require('../utils/mdLinks.js');

const options = {validate: true}

if(yargs.argv.validate === false && yargs.argv.stats === false){
    options.validate = false;
    mdLinks(process.argv[2], options)
    .then(result => {
        result.forEach(link => {
            console.log(link.file, link.href, link.text);
        });
    });
}

else if(yargs.argv.validate === true && yargs.argv.stats === true) {
    console.log('validate y stats');
}

else if(yargs.argv.validate === true) {
    mdLinks(process.argv[2], options)
    .then(result => {
        result.forEach(link => {
            console.log(link.file, link.href, link.ok, link.status, link.text);
        });
    });
}

else if(yargs.argv.stats === true) {
    options.validate = false;
    mdLinks(process.argv[2], options)
    .then(result => {
/*         const unique = result.filter((value, index, self) => {
            console.log('value', value, 'index', index, 'self', self);
            return self.findIndex(v => v.href === value.href) === index;
        });
        console.log(unique); */
        console.log(result);
    });
} 
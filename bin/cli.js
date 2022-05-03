#!/usr/bin/env node
const yargs = require('yargs');
const mdLinks = require('../utils/mdLinks.js');

const options = {validate: true}

if(yargs.argv.validate === true && yargs.argv.stats === true) {
    mdLinks(process.argv[2], options)
    .then(result => {
        const unique = result.filter((link, index, self) => { // self es result
            return self.findIndex(l => l.href === link.href) === index;
        });
        const broken = unique.filter(link => {
            return link.ok === 'fail';
        });
        console.log('Total:', result.length, '\nUnique:', unique.length,'\nBroken:', broken.length);
    });
}

else if(yargs.argv.validate === true) {
    mdLinks(process.argv[2], options)
    .then(result => {
        result.forEach(link => {
            console.log(link.file, link.href, link.ok, link.status, link.text.slice(0, 50));
        });
    });
}

else if(yargs.argv.stats === true) {
    options.validate = false;
    mdLinks(process.argv[2], options)
    .then(result => {
         const unique = result.filter((link, index, self) => { // self es result
            return self.findIndex(l => l.href === link.href) === index;
        });
        console.log('Total:', result.length, '\nUnique:', unique.length);
    });
} 

else {
    options.validate = false;
    mdLinks(process.argv[2], options)
    .then(result => {
        result.forEach(link => {
            console.log(link.file, link.href, link.text.slice(0, 50));
        });
    });
}

#!/usr/bin/env node
const yargs = require('yargs')
/*   .scriptName("md-links")
  .usage("Usage: $0 <ruta-del-archivo> [opciones]")
  .option("v", {
    alias: "validate",
    describe: "Valida los enlaces.",
    demandOption: true,
    type: "booleano",
    nargs: 1,
  })
  .option("h", {
    alias: "stats",
    describe: "The height of the area.",
    demandOption: "The height is required.",
    type: "number",
    nargs: 1,
  }) */

const {mdLinks} = require('../utils/mdLinks.js');

const options = {validate: true}

const validation = yargs.argv.validate;
const stadistics = yargs.argv.stats;

const condition = {

}

switch (yargs.argv.validate || yargs.argv.stats) {
    case (yargs.argv.validate === true && yargs.argv.stats === true) :
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
    break;

    case (yargs.argv.validate === true && yargs.argv.stats !== true) :
        mdLinks(process.argv[2], options)
        .then(result => {
            result.forEach(link => {
                console.log(link.file, link.href, link.ok, link.status, link.text.slice(0, 50), '\n');
            });
        });
    break;

    case (yargs.argv.validate !== true && yargs.argv.stats === true) :
        options.validate = false;
        mdLinks(process.argv[2], options)
        .then(result => {
             const unique = result.filter((link, index, self) => { // self es result
                return self.findIndex(l => l.href === link.href) === index;
            });
            console.log('Total:', result.length, '\nUnique:', unique.length);
        });
    break;
    default:
        options.validate = false;
        mdLinks(process.argv[2], options)
        .then(result => {
            result.forEach(link => {
                console.log(link.file, link.href, link.text.slice(0, 50), '\n');
            });
        });
}

#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2))
  .scriptName('md-links')
  .usage('Uso: $0 <ruta-del-archivo> [opciones]')
  .option('v', {
    alias: 'validar',
    describe: 'Mostrar validación de enlaces.',
    demandOption: false,
    type: 'boolean',
  })
  .option('e', {
    alias: 'estadisticas',
    describe: 'Mostrar cantidad de enlaces totales y enlaces únicos.',
    demandOption: false,
    type: 'boolean',
  })
  .describe('help', 'Mostrar sección de ayuda.') 
  .describe('version', 'Mostrar número de versión.')
  .demandCommand(1, 1, 'Por favor ingresa una ruta de archivo.', 'Por favor ingresa una única ruta de archivo.')
  .strictOptions()
  .argv;

const {mdLinks} = require('../utils/mdLinks.js');

const options = {validate: true}

switch (true) {
    case (argv.validar === true && argv.estadisticas === true) :
        mdLinks(process.argv[2], options)
        .then(result => {
            const unique = result.filter((link, index, self) => {
                return self.findIndex(l => l.href === link.href) === index;
            });
            const broken = unique.filter(link => {
                return link.ok === 'fallido';
            });
            console.log('Total:', result.length, '\nÚnicos:', unique.length,'\nRotos:', broken.length);
        });
    break;

    case (argv.validar === true && argv.estadisticas !== true) :
        mdLinks(process.argv[2], options)
        .then(result => {
            result.forEach(link => {
                console.log(link.file, link.href, link.ok, link.status, '"' + link.text.slice(0, 50) + '"', '\n');
            });
        });
    break;

    case (argv.validar !== true && argv.estadisticas === true) :
        options.validate = false;
        mdLinks(process.argv[2], options)
        .then(result => {
             const unique = result.filter((link, index, self) => {
                return self.findIndex(l => l.href === link.href) === index;
            });
            console.log('Total:', result.length, '\nÚnicos:', unique.length);
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

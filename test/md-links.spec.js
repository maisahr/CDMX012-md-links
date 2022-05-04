const {mdToHTML, validation} = require('../utils/analizeLinks')
const {readAFile, readDirectory, recursion} = require('../utils/readFiles');
const {mdLinks, promise} = require('../utils/mdLinks');

describe('mdToHTML', () => {
  const data = '[Estructuras condicionales y repetitivas](https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops)';
  const file = 'README.md';
  const linksArray = [];

  it('is a function', () => {
    expect(typeof mdToHTML).toBe('function');
  });

  it('returns array of objects, with href, text and file', () => {
    mdToHTML(data, file, linksArray)
    expect(linksArray).toEqual([{
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
        text: 'Estructuras condicionales y repetitivas',
        file: 'README.md'
    }]);
  });

});

describe('validation', () => {

  it('returns object with key ok', () => {
    const link = {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/01-conditionals-and-loops',
      text: 'Estructuras condicionales y repetitivas',
      file: 'README.md'
    }
      
    return validation(link).then(data => {
      expect(data.ok).toEqual('ok');
    })
  });

  it('returns object with key fail', () => {
    const link = {
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: 'README.md'
    }
      
    return validation(link).then(data => {
      expect(data.ok).toEqual('fail');
    })
  });
});

describe('readAFile', () => {
  const linksArray = [];

  it('does not read non-md files', () => {
    readAFile('notmd.js', linksArray);
    expect(linksArray).toEqual([]);
  });
  
  it('reads md files', () => {
    const file = 'README.md';
    const expected = [{"file": "README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}];
    readAFile(file, linksArray);
    expect(linksArray).toEqual(
      expect.arrayContaining(expected),
    );
  });
});

 
describe('readDirectory', () => {

  it('should return array of files inside directory', () => {
    expect(readDirectory('prueba')).toEqual(expect.arrayContaining(['prueba\\archivo1.md']));
  });

});

describe('recursion', () => {
  const linksArray = [];
  it('runs readAFile when file is not a directory', () => {
    const file = 'README.md';
    const expected = [{"file": "README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}];
    recursion(file, linksArray);
    expect(linksArray).toEqual(
      expect.arrayContaining(expected),
    );
  });

});

describe('mdLinks', () => {

  it('returns an array of objects with keys href, text and file if validate is false', () => {
    const options = {validate: false};
    return mdLinks('README.md', options).then(data => {
      expect(data[0]).toEqual(expect.objectContaining({
        href: expect.any(String),
        text: expect.any(String),
        file: expect.any(String)
      }));
    });
  });

  it('calls recursion function', () => {
    const options = {validate: true};
    return mdLinks('README.md', options).then(data => {
      expect(data[0]).toEqual(expect.objectContaining({
        href: expect.any(String),
        text: expect.any(String),
        file: expect.any(String),
        status: expect.any(Number),
        ok: expect.any(String)
      }));
    });
  });

});

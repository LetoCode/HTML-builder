const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');


const distPath = path.resolve(__dirname, 'project-dist', 'bundle.css');
const sourceFolder = path.resolve(__dirname, 'styles');
const filesStyle = [];
let css = [];


fillCssArray();


async function fillCssArray() {

   let dirent = await fsPromise.readdir(sourceFolder, { withFileTypes: true });

   for (const el of dirent) {
      if (el.isFile() && isCSS(el)) {
         filesStyle.push(path.resolve(sourceFolder, el.name));
      }
   }

   for (el of filesStyle) {
      let text = await fsPromise.readFile(el);
      css.push(text.toString());
   }

   createNewCssFile(css);

   console.log('done!');
}


function createNewCssFile(data) {
   fs.writeFile(distPath, data.join('\n'), (err) => {
      if (err) return console.error(err.message);

   })
}


function isCSS(dirent) {
   const ext = path.extname(path.resolve(__dirname, dirent.name));
   return (ext === '.css' ? true : false);
}


const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');


const distFolder = path.resolve(__dirname, 'project-dist');
const styleDistPath = path.resolve(distFolder, 'style.css');
const assetsDistFolder = path.resolve(distFolder, 'assets');
const htmlDistFile = path.resolve(distFolder, 'index.html');

const componentsSourceFolder = path.resolve(__dirname, 'components');
const assetsSourceFolder = path.resolve(__dirname, 'assets');
const styleSourceFolder = path.resolve(__dirname, 'styles');
const htmlSourceFile = path.resolve(__dirname, 'template.html');

const components = {};
const filesStyle = [];
let css = [];

init();

async function init() {

  createFolder(distFolder);
  createFolder(assetsDistFolder);
  await copyFiles(assetsSourceFolder, assetsDistFolder);
  await createCss();
  await readComponents();
  await readHtmlTemplate();

}


function createFolder(folder) {
  fs.mkdir(folder, { recursive: true }, (err, path) => {
    if (err) throw err;
  })
  console.log('createFolder>>', folder)
}


async function copyFiles(sourceFolder, distFolder) {

  fsPromise.readdir(sourceFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
  })
    .then(files => {
      //console.log(files)
      for (const file of files) {
        if (file.isFile()) {
          const src = path.resolve(sourceFolder, file.name);
          const dest = path.resolve(distFolder, file.name)
          fs.copyFile(src, dest, err => { if (err) console.error(err.message, '!!!*') })
        } else {
          createFolder(path.resolve(distFolder, file.name));
          copyFiles(path.resolve(sourceFolder, file.name), path.resolve(distFolder, file.name));
        }
      }
    })
}


async function createCss() {

  let dirent = await fsPromise.readdir(styleSourceFolder, { withFileTypes: true });

  for (const el of dirent) {
    if (el.isFile() && isCSS(el)) {
      filesStyle.push(path.resolve(styleSourceFolder, el.name));
    }
  }

  for (el of filesStyle) {
    let text = await fsPromise.readFile(el);
    css.push(text.toString());
  }

  createNewCssFile(css);

}


function createNewCssFile(data) {
  fs.writeFile(styleDistPath, data.join('\n'), (err) => {
    if (err) return console.error(err.message);

  })
}


function isCSS(dirent) {
  const ext = path.extname(path.resolve(__dirname, dirent.name));
  return (ext === '.css' ? true : false);
}

function isHTML(dirent) {
  const ext = path.extname(path.resolve(__dirname, dirent.name));
  return (ext === '.html' ? true : false);
}


async function readComponents() {

  let dirent = await fsPromise.readdir(componentsSourceFolder, { withFileTypes: true });

  for (const el of dirent) {
    if (el.isFile() && isHTML(el)) {
      let text = await fsPromise.readFile(path.resolve(componentsSourceFolder, el.name));
      let fileName = el.name.split('.')[0];
      components[fileName] = text.toString();
    }
  }


}

async function readHtmlTemplate() {
  let text = (await fsPromise.readFile(htmlSourceFile)).toString();

  for (const component in components) {
    text = text.replace(`{{${component}}}`, components[component]);
  }

  fs.writeFile(htmlDistFile, text, err => { if (err) throw err })
}
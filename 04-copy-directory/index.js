const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const sourceFolder = path.resolve(__dirname, 'files');
const targetFolder = path.resolve(__dirname, 'files-copy');

copyDir();

function copyDir() {

   let dir = fs.stat(targetFolder, (err) => {
      if (!err) {
         deleteDir().then((err) => {
            if (err) console.error(err.message, '!!!!!!!!!!!!!');
            makeDir();
            copyFiles();
         })
      } else {
         makeDir();
         copyFiles();
      }
   });
}


function deleteDir() {
   return fsPromise.rm(targetFolder, { recursive: true });
}


function makeDir() {
   fs.mkdir(targetFolder, { recursive: true }, (err, path) => {
      if (err) throw err;
   })

}


function copyFiles() {
   fsPromise.readdir(sourceFolder, { withFileTypes: true }, (err, files) => {
      if (err) throw err;
   })
      .then(files => {
         for (const file of files) {
            if (file.isFile()) {
               const src = path.resolve(sourceFolder, file.name);
               const dest = path.resolve(targetFolder, file.name)
               fs.copyFile(src, dest, err => { if (err) throw err })
            }
         }
      })
}

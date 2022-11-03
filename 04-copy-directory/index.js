function copyDir() {
   const fs = require('fs');
   const fsPromise = require('fs/promises');
   const path = require('path');

   const sourceFolder = path.resolve(__dirname, 'files');
   const targetFolder = path.resolve(__dirname, 'files-copy');

   fs.mkdir(targetFolder, { recursive: true }, (err, path) => {
      if (err) throw err;
   })

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

copyDir();


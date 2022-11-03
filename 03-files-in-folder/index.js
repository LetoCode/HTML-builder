const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const targetFolder = path.resolve(__dirname, 'secret-folder');


function read(targetFolder, options) {
   fsPromise.readdir(targetFolder, options)
      .then(data => {
         for (const el of data) {
            if (el.isDirectory()) {
               read(path.resolve(targetFolder, el.name), options);
            } else {
               const name = el.name.split('.')[0];
               const ext = path.extname(path.resolve(targetFolder, el.name)).slice(1);
               let size = '';
               fs.stat(path.resolve(targetFolder, el.name), (err, stats) => {
                  size = stats.size;
                  console.log(`${name || el.name} - ${ext} - ${size}`)
               });

            }
         }
      })

}

read(targetFolder, { withFileTypes: true });

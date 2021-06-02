/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
const figlet = require('figlet');
const fs = require('fs-extra');
const path = require('path');
// figlet('Hello World !!', function(err, data) {
//   if (err) {
//     console.log('Something went wrong...');
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });


function installDependencies(name, options = {}) {
  const dependenciesPath = `${path.resolve(__dirname, '../../')}/node_modules`;
  console.log('dependenciesPath:', dependenciesPath);
  fs.exists(dependenciesPath, function(exists) {
    if (exists) {
      console.log('dependencies exited. Do you want to overwrite？');
    } else {

    }
  });
}

installDependencies();

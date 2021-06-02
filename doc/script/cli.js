/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
const program = require('commander');
program
  .version('0.1.0')
  .command('create <name>')
  .description('create a new project')
  .action(name => {
  });

program.parse();

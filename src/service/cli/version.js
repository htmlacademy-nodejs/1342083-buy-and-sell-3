'use strict';

const chalk = require(`chalk`);

const packageJsonFile = require(`../../../package.json`);
const {
  CliCommand,
} = require(`./constants`);

module.exports = {
  name: CliCommand.VERSION,
  run() {
    const version = packageJsonFile.version;
    console.info(chalk.blue(version));
  },
};

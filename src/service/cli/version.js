'use strict';

const packageJsonFile = require(`../../../package.json`);
const {CliCommand} = require(`../../constants`);
const {showVersionMessage} = require(`../../utils`);

module.exports = {
  name: CliCommand.VERSION,
  run() {
    showVersionMessage(packageJsonFile.version);
  },
};

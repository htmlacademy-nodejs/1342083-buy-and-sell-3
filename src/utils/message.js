'use strict';

const chalk = require(`chalk`);

const showErrorMessage = (message) => console.error(chalk.red(message));

const showHelpMessage = (message) => console.info(chalk.gray(message));

const showSuccessMessage = (message) => console.info(chalk.green(message));

const showVersionMessage = (message) => console.info(chalk.blue(message));

module.exports = {
  showErrorMessage,
  showHelpMessage,
  showSuccessMessage,
  showVersionMessage,
};

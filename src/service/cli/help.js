'use strict';

const chalk = require(`chalk`);
const {CliCommand} = require(`./constants`);

module.exports = {
  name: CliCommand.HELP,
  run() {
    const text = `
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
service.js <command>

Команды:
${CliCommand.VERSION}:            выводит номер версии
${CliCommand.HELP}:               печатает этот текст
${CliCommand.GENERATE}: <count>   формирует файл mocks.json
`;

    console.info(chalk.gray(text));
  },
};

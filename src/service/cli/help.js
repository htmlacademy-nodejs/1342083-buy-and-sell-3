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
${CliCommand.SERVER}: <port>      запускает сервер на указанном порту (по умолчанию - 3000)
${CliCommand.GENERATE}: <count>   формирует файл mocks.json
`;

    console.info(chalk.gray(text));
  },
};

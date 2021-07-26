'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const express = require(`express`);
const {CliCommand, HttpCode, ServerConfig} = require(`./constants`);

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || ServerConfig.PORT;

    const app = express();
    app.use(express.json());

    app.get(`/offers`, async (req, res) => {
      let mocks = null;

      try {
        const fileContent = await fs.readFile(ServerConfig.FILENAME);
        mocks = JSON.parse(fileContent);
      } catch (err) {
        mocks = [];
      }

      res.json(mocks);
    });

    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(ServerConfig.ERROR_MESSAGE));

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера: ${err.message}`));
      }
      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};

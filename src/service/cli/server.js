'use strict';

const express = require(`express`);
const routes = require(`../api`);
const {CliCommand} = require(`../../constants`);
const {showErrorMessage, showSuccessMessage} = require(`../../utils`);

const ServerConfig = {
  API_PREFIX: `/api`,
  PORT: 3000,
};

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || ServerConfig.PORT;

    const app = express();
    app.use(express.json());
    app.use(ServerConfig.API_PREFIX, routes);

    app.listen(port, (err) => {
      if (err) {
        return showErrorMessage(`Ошибка при создании сервера: ${err.message}`);
      }

      return showSuccessMessage(`Ожидаю соединений на http://localhost:${port}`);
    });
  },
};

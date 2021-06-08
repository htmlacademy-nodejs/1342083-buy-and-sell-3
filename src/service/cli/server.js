'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);
const {CliCommand, ContentType, HttpCode, ServerConfig} = require(`./constants`);

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || ServerConfig.PORT;

    const sendResponse = (response, statusCode, message) => {
      const template = `
        <!DOCTYPE html>
          <html lang="ru">
          <head>
            <title>From Node with love!</title>
          </head>
          <body>
            ${message}
          </body>
        </html>`.trim();

      response.writeHead(statusCode, {
        'Content-Type': ContentType.HTML,
      });

      response.end(template);
    };

    const onClientConnect = async (req, res) => {
      const {url} = req;

      switch (url) {
        case `/`:
          try {
            const fileContent = await fs.readFile(ServerConfig.FILENAME);
            const mocks = JSON.parse(fileContent);

            const markup = `<ul>${mocks
              .map(({title}) => `<li>${title}</li>`)
              .join(``)
            }</ul>`;

            sendResponse(res, HttpCode.OK, markup);
          } catch (err) {
            sendResponse(res, HttpCode.NOT_FOUND, ServerConfig.ERROR_MESSAGE);
          }
          break;
        default:
          sendResponse(res, HttpCode.NOT_FOUND, ServerConfig.ERROR_MESSAGE);
          break;
      }
    };

    const httpServer = http.createServer(onClientConnect);
    httpServer.listen(port);
    httpServer
      .on(`listening`, () => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  },
};

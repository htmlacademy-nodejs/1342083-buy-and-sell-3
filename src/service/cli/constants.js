'use strict';

const CliCommand = {
  GENERATE: `--generate`,
  HELP: `--help`,
  SERVER: `--server`,
  VERSION: `--version`,
};

const ContentType = {
  HTML: `text/html; charset=UTF-8`,
  PLAIN: `text/plain; charset=UTF-8`,
};

const DEFAULT_COMMAND = CliCommand.HELP;

const ServerConfig = {
  PORT: 3000,
  FILENAME: `mocks.json`,
  ERROR_MESSAGE: `Not found`,
};

const FilePath = {
  FILE_CATEGORIES_PATH: `./data/categories.txt`,
  FILE_SENTENCES_PATH: `./data/sentences.txt`,
  FILE_TITLES_PATH: `./data/titles.txt`,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const MocksConfig = {
  DEFAULT_COUNT: 1,
  FILE_NAME: `mocks.json`,
  DESCRIPTION_RESTRICT: {
    MIN: 1,
    MAX: 5,
  },
  PICTURE_INDEX_RESTRICT: {
    MIN: 1,
    MAX: 16,
  },
  SUM_RESTRICT: {
    MIN: 1000,
    MAX: 100000,
  },
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

module.exports = {
  CliCommand,
  ContentType,
  DEFAULT_COMMAND,
  FilePath,
  HttpCode,
  MocksConfig,
  ServerConfig,
  OfferType,
};

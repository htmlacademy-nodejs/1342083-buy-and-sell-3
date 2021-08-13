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
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const MocksConfig = {
  DEFAULT_COUNT: 1,
  FILE_NAME: `mocks.json`,
  MAX_ID_LENGTH: 6,
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
  COMMENTS_RESTRICT: {
    MIN: 0,
    MAX: 5,
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

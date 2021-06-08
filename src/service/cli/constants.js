'use strict';

const CliCommand = {
  GENERATE: `--generate`,
  HELP: `--help`,
  VERSION: `--version`,
};

const DEFAULT_COMMAND = CliCommand.HELP;

const FilePaths = {
  FILE_CATEGORIES_PATH: `./data/categories.txt`,
  FILE_SENTENCES_PATH: `./data/sentences.txt`,
  FILE_TITLES_PATH: `./data/titles.txt`,
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
  DEFAULT_COMMAND,
  FilePaths,
  MocksConfig,
  OfferType,
};

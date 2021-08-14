'use strict';

const ID_MAX_LENGTH = 6;
const RANDOM_SEPARATOR = 0.5;
const USER_ARGV_INDEX = 2;

const CliCommand = {
  GENERATE: `--generate`,
  HELP: `--help`,
  SERVER: `--server`,
  VERSION: `--version`,
};

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const FilePath = {
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`,
  MOCKS: `mocks.json`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const Message = {
  BAD_REQUEST: `Bad request`,
  NOT_FOUND: `Not found`,
};

module.exports = {
  ID_MAX_LENGTH,
  RANDOM_SEPARATOR,
  USER_ARGV_INDEX,

  CliCommand,
  ExitCode,
  FilePath,
  HttpCode,
  Message,
};

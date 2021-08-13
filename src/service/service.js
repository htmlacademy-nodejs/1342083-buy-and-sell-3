'use strict';

const {
  Cli,
} = require(`./cli`);
const {
  USER_ARGV_INDEX,
  ExitCode,
} = require(`../constants`);
const {
  DEFAULT_COMMAND,
} = require(`./cli/constants`);

const userArgumens = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArgumens;

if (userArgumens.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

Cli[userCommand].run(userArgumens.slice(1));

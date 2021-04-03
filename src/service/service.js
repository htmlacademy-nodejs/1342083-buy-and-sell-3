'use strict';

const {Cli} = require(`./cli`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
} = require(`../constants`);

const userArgumens = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArgumens;

if (userArgumens.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArgumens.slice(1));

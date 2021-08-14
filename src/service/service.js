'use strict';

const Cli = require(`./cli`);
const {USER_ARGV_INDEX, CliCommand, ExitCode} = require(`../constants`);

const userArgumens = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArgumens;

if (!userArgumens.length || !Cli[userCommand]) {
  Cli[CliCommand.HELP].run();
  process.exit(ExitCode.SUCCESS);
}

Cli[userCommand].run(userArgumens.slice(1));

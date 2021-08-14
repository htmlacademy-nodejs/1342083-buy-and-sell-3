'use strict';

const {
  getRandomId,
  getRandomInt,
} = require(`./common`);

const {
  shuffle,
  getRandomArrayItem,
  getRandomArrayItems,
} = require(`./array`);

const {
  showErrorMessage,
  showHelpMessage,
  showSuccessMessage,
  showVersionMessage,
} = require(`./message`);

module.exports = {
  getRandomId,
  getRandomInt,

  shuffle,
  getRandomArrayItem,
  getRandomArrayItems,

  showErrorMessage,
  showHelpMessage,
  showSuccessMessage,
  showVersionMessage,
};

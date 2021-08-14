'use strict';

const {getRandomInt} = require(`./common`);
const {RANDOM_SEPARATOR} = require(`../constants`);

const shuffle = (array) => array.slice().sort(() => Math.random() - RANDOM_SEPARATOR);

const getRandomArrayItem = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomArrayItems = (array, max = (array.length - 1)) => {
  const count = getRandomInt(1, max);
  return shuffle(array).slice(0, count);
};

module.exports = {
  shuffle,
  getRandomArrayItem,
  getRandomArrayItems,
};

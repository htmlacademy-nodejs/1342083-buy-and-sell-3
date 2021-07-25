'use strict';

const {RANDOM_SEPARATOR} = require(`./constants`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  return array
    .slice()
    .sort(() => Math.random() - RANDOM_SEPARATOR);
};

const getRandomArrayItem = (array) => {
  const {length} = array;
  const randomIndex = getRandomInt(0, length - 1);
  return array[randomIndex];
};

const getRandomArrayItems = (array, max = (array.length - 1)) => {
  const count = getRandomInt(1, max);
  return shuffle(array).slice(0, count);
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomArrayItem,
  getRandomArrayItems,
};

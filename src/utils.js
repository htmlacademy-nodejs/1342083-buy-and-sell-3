'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

const getRandomArrayItem = (array) => {
  const {length} = array;
  const randomIndex = getRandomInt(0, length - 1);

  return array[randomIndex];
};

const getRandomArrayItems = (array, max = (array.length - 1)) => {
  const arrayCopy = [...array];
  const count = getRandomInt(1, max);

  return shuffle(arrayCopy).slice(0, count);
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomArrayItem,
  getRandomArrayItems,
};

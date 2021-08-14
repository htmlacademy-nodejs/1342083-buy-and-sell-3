'use strict';

const {nanoid} = require(`nanoid`);
const {ID_MAX_LENGTH} = require(`../constants`);

const getRandomId = (length = ID_MAX_LENGTH) => nanoid(length);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


module.exports = {
  getRandomId,
  getRandomInt,
};

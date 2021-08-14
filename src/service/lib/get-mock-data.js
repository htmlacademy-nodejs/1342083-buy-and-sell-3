'use strict';

const fs = require(`fs`).promises;
const {FilePath} = require(`../../constants`);
const {showErrorMessage} = require(`../../utils`);

let data = [];

const getMockData = async () => {
  if (data.length) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FilePath.MOCKS);
    data = JSON.parse(fileContent);
  } catch (err) {
    showErrorMessage(err);
  }

  return data;
};

module.exports = getMockData;

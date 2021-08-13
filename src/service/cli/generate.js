'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  ExitCode,
} = require(`../../constants`);
const {
  getRandomInt,
  getRandomArrayItem,
  getRandomArrayItems
} = require(`../../utils`);
const {
  CliCommand,
  FilePath,
  MocksConfig,
  OfferType
} = require(`./constants`);
const {
  DEFAULT_COUNT,
  DESCRIPTION_RESTRICT,
  FILE_NAME,
  PICTURE_INDEX_RESTRICT,
  SUM_RESTRICT
} = MocksConfig;

const getRandomId = () => nanoid();

const getRandomTitle = (titles) => getRandomArrayItem(titles);

const getRandomPicture = () => {
  const index = getRandomInt(PICTURE_INDEX_RESTRICT.MIN, PICTURE_INDEX_RESTRICT.MAX).toString().padStart(2, `0`);
  return `item${index}.jpg`;
};

const getRandomDescription = (sentences) => getRandomArrayItems(sentences, DESCRIPTION_RESTRICT.MAX).join(` `);

const getType = () => getRandomArrayItem(Object.values(OfferType));

const getRandomSum = () => getRandomInt(SUM_RESTRICT.MIN, SUM_RESTRICT.MAX);

const getCategories = (categories) => getRandomArrayItems(categories);

const generateOffer = (count, titles, sentences, categories) => {
  return Array.from(new Array(count), () => ({
    id: getRandomId(),
    title: getRandomTitle(titles),
    picture: getRandomPicture(),
    description: getRandomDescription(sentences),
    type: getType(),
    sum: getRandomSum(),
    category: getCategories(categories),
  }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `UTF-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.err(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: CliCommand.GENERATE,
  async run(args) {
    const titles = await readContent(FilePath.TITLES);
    const sentences = await readContent(FilePath.SENTENCES);
    const categories = await readContent(FilePath.CATEGORIES);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffer(countOffer, titles, sentences, categories), null, 2);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Операция успешна. Файл создан.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Не могу записать данные в файл...`));
      process.exit(ExitCode.ERROR);
    }
  },
};

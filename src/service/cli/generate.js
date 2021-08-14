'use strict';

const fs = require(`fs`).promises;
const {CliCommand, ExitCode, FilePath} = require(`../../constants`);
const {
  getRandomId,
  getRandomInt,
  getRandomArrayItem,
  getRandomArrayItems,
  showErrorMessage,
  showSuccessMessage,
} = require(`../../utils`);

const CommentsRestict = {
  MIN: 0,
  MAX: 5,
};

const DEFAULT_MOCKS_COUNT = 1;

const DescriptionRestrict = {
  MIN: 1,
  MAX: 5,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const PictureIndexRestrict = {
  MIN: 1,
  MAX: 16,
};

const SaveMessage = {
  ERROR: `Не могу записать данные в файл...`,
  SUCCESS: `Операция успешна. Файл создан.`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const getRandomTitle = (titles) => getRandomArrayItem(titles);

const getRandomPicture = () => {
  const index =
    getRandomInt(PictureIndexRestrict.MIN, PictureIndexRestrict.MAX).toString().padStart(2, `0`);
  return `item${index}.jpg`;
};

const getRandomText = (sentences) => getRandomArrayItems(sentences, DescriptionRestrict.MAX).join(` `);

const getType = () => getRandomArrayItem(Object.values(OfferType));

const getRandomSum = () => getRandomInt(SumRestrict.MIN, SumRestrict.MAX);

const getCategories = (categories) => getRandomArrayItems(categories);

const generateRandomComments = (count, comments) => {
  return Array.from(new Array(count), () => ({
    id: getRandomId(),
    text: getRandomText(comments),
  }));
};

const generateOffer = (count, titles, sentences, categories, comments) => {
  return Array.from(new Array(count), () => {
    const commentsCount = getRandomInt(CommentsRestict.MIN, CommentsRestict.MAX);

    return {
      id: getRandomId(),
      title: getRandomTitle(titles),
      picture: getRandomPicture(),
      description: getRandomText(sentences),
      type: getType(),
      sum: getRandomSum(),
      category: getCategories(categories),
      comments: generateRandomComments(commentsCount, comments),
    };
  });
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `UTF-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    showErrorMessage(err);
    return [];
  }
};

module.exports = {
  name: CliCommand.GENERATE,
  async run(args) {
    const titles = await readContent(FilePath.TITLES);
    const sentences = await readContent(FilePath.SENTENCES);
    const categories = await readContent(FilePath.CATEGORIES);
    const comments = await readContent(FilePath.COMMENTS);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_MOCKS_COUNT;
    const mocks = generateOffer(countOffer, titles, sentences, categories, comments);
    const content = JSON.stringify(mocks, null, 2);

    try {
      await fs.writeFile(FilePath.MOCKS, content);
      showSuccessMessage(SaveMessage.SUCCESS);
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      showErrorMessage(SaveMessage.ERROR);
      process.exit(ExitCode.ERROR);
    }
  },
};

'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomInt,
  getRandomArrayItem,
  getRandomArrayItems,
} = require(`../../utils`);
const {
  CliCommand,
  FilePath,
  MocksConfig,
  OfferType,
} = require(`./constants`);

const {
  DEFAULT_COUNT,
  DESCRIPTION_RESTRICT,
  FILE_NAME,
  PICTURE_INDEX_RESTRICT,
  SUM_RESTRICT,
} = MocksConfig;

const {
  FILE_TITLES_PATH,
  FILE_SENTENCES_PATH,
  FILE_CATEGORIES_PATH,
} = FilePath;

class OfferGenerator {
  static getRandomTitle(titles) {
    return getRandomArrayItem(titles);
  }

  static getRandomPicture() {
    const index = getRandomInt(PICTURE_INDEX_RESTRICT.MIN, PICTURE_INDEX_RESTRICT.MAX)
      .toString()
      .padStart(2, `0`);

    return `item${index}.jpg`;
  }

  static getRandomDescription(sentences) {
    return getRandomArrayItems(sentences, DESCRIPTION_RESTRICT.MAX).join(` `);
  }

  static getType() {
    return getRandomArrayItem(Object.values(OfferType));
  }

  static getRandomSum() {
    return getRandomInt(SUM_RESTRICT.MIN, SUM_RESTRICT.MAX);
  }

  static getCategories(categories) {
    return getRandomArrayItems(categories);
  }

  static async readContent(filePath) {
    try {
      const content = await fs.readFile(filePath, `UTF-8`);
      return content
        .trim()
        .split(`\n`);
    } catch (err) {
      console.log(chalk.red(err));
      return [];
    }
  }

  static generateOffer(count, titles, sentences, categories) {
    return Array.from(new Array(count), () => {
      return {
        title: this.getRandomTitle(titles),
        picture: this.getRandomPicture(),
        description: this.getRandomDescription(sentences),
        type: this.getType(),
        sum: this.getRandomSum(),
        category: this.getCategories(categories),
      };
    });
  }
}

module.exports = {
  name: CliCommand.GENERATE,
  async run(args) {
    const titles = await OfferGenerator.readContent(FILE_TITLES_PATH);
    const sentences = await OfferGenerator.readContent(FILE_SENTENCES_PATH);
    const categories = await OfferGenerator.readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(OfferGenerator.generateOffer(countOffer, titles, sentences, categories), null, 2);

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

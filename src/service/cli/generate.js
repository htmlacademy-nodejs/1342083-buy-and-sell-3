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
  MocksConfig,
  OfferType,
} = require(`./constants`);

const {
  CATEGORIES,
  DEFAULT_COUNT,
  DESCRIPTION_RESTRICT,
  FILE_NAME,
  TITLES,
  PICTURE_INDEX_RESTRICT,
  SENTECES,
  SUM_RESTRICT,
} = MocksConfig;

class OfferGenerator {
  static getRandomTitle() {
    return getRandomArrayItem(TITLES);
  }

  static getRandomPicture() {
    const index = getRandomInt(PICTURE_INDEX_RESTRICT.MIN, PICTURE_INDEX_RESTRICT.MAX)
      .toString()
      .padStart(2, `0`);

    return `item${index}.jpg`;
  }

  static getRandomDescription() {
    return getRandomArrayItems(SENTECES, DESCRIPTION_RESTRICT.MAX).join(` `);
  }

  static getType() {
    return getRandomArrayItem(Object.values(OfferType));
  }

  static getRandomSum() {
    return getRandomInt(SUM_RESTRICT.MIN, SUM_RESTRICT.MAX);
  }

  static getCategories() {
    return getRandomArrayItems(CATEGORIES);
  }

  static generateOffer(count) {
    return Array.from(new Array(count), () => {
      return {
        title: this.getRandomTitle(),
        picture: this.getRandomPicture(),
        description: this.getRandomDescription(),
        type: this.getType(),
        sum: this.getRandomSum(),
        category: this.getCategories(),
      };
    });
  }
}

module.exports = {
  name: CliCommand.GENERATE,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(OfferGenerator.generateOffer(countOffer), null, 2);

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

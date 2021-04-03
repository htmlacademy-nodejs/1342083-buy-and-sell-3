'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);

const {
  getRandomInt,
  getRandomArrayItem,
  getRandomArrayItems,
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  TITLES,
  SENTECES,
  CATEGORIES,
} = require(`./constants`);

const {
  DescriptionRestrict,
  PictureIndexRestrict,
  OfferType,
  SumRestrict,
} = require(`./enums`);

class OfferGenerator {
  static getRandomTitle() {
    return getRandomArrayItem(TITLES);
  }

  static getRandomPicture() {
    const index = getRandomInt(PictureIndexRestrict.MIN, PictureIndexRestrict.MAX)
      .toString()
      .padStart(2, `0`);

    return `item${index}.jpg`;
  }

  static getRandomDescription() {
    return getRandomArrayItems(SENTECES, DescriptionRestrict.MAX).join(` `);
  }

  static getType() {
    return getRandomArrayItem(Object.values(OfferType));
  }

  static getRandomSum() {
    return getRandomInt(SumRestrict.MIN, SumRestrict.MAX);
  }

  static getCategories() {
    return getRandomArrayItems(CATEGORIES);
  }

  static generateOffer(count) {
    const offer = Array(count).fill(``).map(() => {
      return {
        title: this.getRandomTitle(),
        picture: this.getRandomPicture(),
        description: this.getRandomDescription(),
        type: this.getType(),
        sum: this.getRandomSum(),
        category: this.getCategories(),
      };
    });

    return offer;
  }
}

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(OfferGenerator.generateOffer(countOffer), null, 2);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(chalk.red(`Не могу записать данные в файл...`));
        process.exit(ExitCode.error);
      }

      console.info(chalk.green(`Операция успешна. Файл создан.`));
      process.exit(ExitCode.success);
    });
  },
};

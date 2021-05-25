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
  CliCommand,
  MocksConfig,
  DescriptionRestrict,
  PictureIndexRestrict,
  OfferType,
  SumRestrict,
} = require(`./constants`);

class OfferGenerator {
  static getRandomTitle() {
    return getRandomArrayItem(MocksConfig.TITLES);
  }

  static getRandomPicture() {
    const index = getRandomInt(PictureIndexRestrict.MIN, PictureIndexRestrict.MAX)
      .toString()
      .padStart(2, `0`);

    return `item${index}.jpg`;
  }

  static getRandomDescription() {
    return getRandomArrayItems(MocksConfig.SENTECES, DescriptionRestrict.MAX).join(` `);
  }

  static getType() {
    return getRandomArrayItem(Object.values(OfferType));
  }

  static getRandomSum() {
    return getRandomInt(SumRestrict.MIN, SumRestrict.MAX);
  }

  static getCategories() {
    return getRandomArrayItems(MocksConfig.CATEGORIES);
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
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || MocksConfig.DEFAULT_COUNT;
    const content = JSON.stringify(OfferGenerator.generateOffer(countOffer), null, 2);

    fs.writeFile(MocksConfig.FILE_NAME, content, (err) => {
      if (err) {
        console.error(chalk.red(`Не могу записать данные в файл...`));
        process.exit(ExitCode.ERROR);
      }

      console.info(chalk.green(`Операция успешна. Файл создан.`));
      process.exit(ExitCode.SUCCESS);
    });
  },
};

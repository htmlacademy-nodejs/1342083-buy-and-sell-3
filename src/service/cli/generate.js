'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const {
  getRandomInt,
  getRandomArrayItem,
  getRandomArrayItems,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const SENTECES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const DescriptionRestrict = {
  MIN: 1,
  MAX: 5,
};

const PictureIndexRestrict = {
  MIN: 1,
  MAX: 16,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const getRandomTitle = () => getRandomArrayItem(TITLES);

const getRandomPicture = () => {
  const index = getRandomInt(PictureIndexRestrict.MIN, PictureIndexRestrict.MAX)
    .toString()
    .padStart(2, `0`);

  return `item${index}.jpg`;
};

const getRandomDescription = () => getRandomArrayItems(SENTECES, DescriptionRestrict.MAX).join(` `);
const getType = () => getRandomArrayItem(Object.values(OfferType));
const getRandomSum = () => getRandomInt(SumRestrict.MIN, SumRestrict.MAX);
const getCategories = () => getRandomArrayItems(CATEGORIES);

const generateOffers = (count) => {
  const offer = Array(count).fill(``).map(() => {
    return {
      title: getRandomTitle(),
      picture: getRandomPicture(),
      description: getRandomDescription(),
      type: getType(),
      sum: getRandomSum(),
      category: getCategories(),
    };
  });

  return offer;
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 2);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(chalk.red(`Не могу записать данные в файл...`));
      }

      console.info(chalk.green(`Операция успешна. Файл создан.`));
    });
  },
};

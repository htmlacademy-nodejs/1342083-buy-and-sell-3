'use strict';

const {beforeAll, describe, test, expect} = require(`@jest/globals`);
const request = require(`supertest`);
const express = require(`express`);
const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `fVXOZ1`,
    title: `Отдам в хорошие руки подшивку «Мурзилка».`,
    picture: `item09.jpg`,
    description: `Даю недельную гарантию. Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам. При покупке с меня бесплатная доставка в черте города.`,
    type: `sale`,
    sum: 85401,
    category: [
      `Игры`,
      `Животные`
    ],
    comments: [
      {
        id: `h0n3BJ`,
        text: `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `NkhX-w`,
        text: `А где блок питания? А сколько игр в комплекте? Вы что?! В магазине дешевле. Почему в таком ужасном состоянии?`
      },
      {
        id: `L1RTcK`,
        text: `А сколько игр в комплекте? Совсем немного... С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `IxkqX0`,
        text: `Вы что?! В магазине дешевле. Совсем немного... А где блок питания? С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `dESIbD`,
        text: `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. А где блок питания? Совсем немного... Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    id: `cf5g6p`,
    title: `Куплю детские санки.`,
    picture: `item05.jpg`,
    description: `Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Кажется, что это хрупкая вещь. Не пытайтесь торговаться. Цену вещам я знаю.`,
    type: `sale`,
    sum: 34237,
    category: [
      `Книги`,
      `Разное`,
      `Журналы`
    ],
    comments: [
      {
        id: `8pQVDQ`,
        text: `А где блок питания? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    id: `gozLT4`,
    title: `Куплю антиквариат.`,
    picture: `item07.jpg`,
    description: `Если найдёте дешевле — сброшу цену.`,
    type: `offer`,
    sum: 91336,
    category: [
      `Разное`
    ],
    comments: [
      {
        id: `Twg-z_`,
        text: `Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    id: `EYWUdE`,
    title: `Продам отличную подборку фильмов на VHS.`,
    picture: `item05.jpg`,
    description: `Если товар не понравится — верну всё до последней копейки.`,
    type: `sale`,
    sum: 75322,
    category: [
      `Журналы`,
      `Животные`,
      `Игры`
    ],
    comments: [
      {
        id: `QyyYbB`,
        text: `Неплохо, но дорого Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`
      },
      {
        id: `5-vqv5`,
        text: `А где блок питания? Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? Совсем немного...`
      }
    ]
  },
  {
    id: `3zwFuz`,
    title: `Куплю детские санки.`,
    picture: `item04.jpg`,
    description: `Мой дед не мог её сломать. Кому нужен этот новый телефон, если тут такое... Бонусом отдам все аксессуары.`,
    type: `offer`,
    sum: 55277,
    category: [
      `Книги`,
      `Журналы`,
      `Разное`,
      `Посуда`,
      `Игры`
    ],
    comments: [
      {
        id: `A17E-5`,
        text: `Неплохо, но дорого`
      },
      {
        id: `vP65SO`,
        text: `Неплохо, но дорого С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? Вы что?! В магазине дешевле.`
      },
      {
        id: `UdKsV_`,
        text: `А сколько игр в комплекте? Почему в таком ужасном состоянии? Оплата наличными или перевод на карту?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API возвращает список офферов`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({query: `Отдам в хорошие руки`});
  });

  test(`Статус ответа равен 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Возвращает не меньше одного оффера`, () => {
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});

test(`API возвращает 400, если запрос некорректный`, () => {
  return request(app)
    .get(`/search`)
    .query({foo: `bar`})
    .expect(HttpCode.BAD_REQUEST);
});

test(`API возвращает 404, если офферы не найдены`, () => {
  return request(app)
    .get(`/search`)
    .query({query: `Куплю слона`})
    .expect(HttpCode.NOT_FOUND);
});

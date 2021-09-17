'use strict';

const {beforeAll, describe, test, expect} = require(`@jest/globals`);
const request = require(`supertest`);
const express = require(`express`);
const offers = require(`./offers`);
const OfferDataService = require(`../data-service/offer`);
const CommentDataService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `ZqDqVs`,
    title: `Продам коллекцию журналов «Огонёк».`,
    picture: `item13.jpg`,
    description: `Это настоящая находка для коллекционера! Мой дед не мог её сломать.`,
    type: `sale`,
    sum: 21535,
    category: [
      `Книги`,
      `Разное`,
      `Игры`,
      `Журналы`,
      `Посуда`
    ],
    comments: [
      {
        id: `Kjq3D9`,
        text: `Совсем немного... Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? Неплохо, но дорого Оплата наличными или перевод на карту?`
      },
      {
        id: `HrBHnT`,
        text: `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту?`
      },
      {
        id: `EXM2ZY`,
        text: `Неплохо, но дорого А где блок питания? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    id: `5uuPN7`,
    title: `Продам отличную подборку фильмов на VHS.`,
    picture: `item11.jpg`,
    description: `Мой дед не мог её сломать. Товар в отличном состоянии.`,
    type: `sale`,
    sum: 20620,
    category: [
      `Посуда`,
      `Игры`,
      `Разное`,
      `Животные`
    ],
    comments: [
      {
        id: `pEuo32`,
        text: `Вы что?! В магазине дешевле.`
      },
      {
        id: `xgU-ff`,
        text: `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    id: `sw-CB5`,
    title: `Продам коллекцию журналов «Огонёк».`,
    picture: `item07.jpg`,
    description: `Товар в отличном состоянии.`,
    type: `sale`,
    sum: 53260,
    category: [
      `Посуда`,
      `Разное`
    ],
    comments: [
      {
        id: `j8nCiF`,
        text: `Совсем немного... Вы что?! В магазине дешевле. Почему в таком ужасном состоянии?`
      },
      {
        id: `eym1ps`,
        text: `Почему в таком ужасном состоянии?`
      },
      {
        id: `VfnNr2`,
        text: `С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `hqXPba`,
        text: `Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    id: `6nfnES`,
    title: `Продам советскую посуду. Почти не разбита.`,
    picture: `item03.jpg`,
    description: `Пользовались бережно и только по большим праздникам. Продаю с болью в сердце...`,
    type: `sale`,
    sum: 36856,
    category: [
      `Журналы`,
      `Игры`,
      `Посуда`,
      `Разное`
    ],
    comments: [
      {
        id: `p6IuWW`,
        text: `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `xkQwiK`,
        text: `С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      },
      {
        id: `-b9oWH`,
        text: `С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    id: `mDA6Nw`,
    title: `Продам отличную подборку фильмов на VHS.`,
    picture: `item07.jpg`,
    description: `Кажется, что это хрупкая вещь. Товар в отличном состоянии. При покупке с меня бесплатная доставка в черте города.`,
    type: `sale`,
    sum: 7270,
    category: [
      `Посуда`,
      `Книги`,
      `Разное`
    ],
    comments: [
      {
        id: `zxv7LX`,
        text: `А сколько игр в комплекте? Почему в таком ужасном состоянии?`
      },
      {
        id: `_LoTMT`,
        text: `А сколько игр в комплекте? Почему в таком ужасном состоянии? А где блок питания? Совсем немного... С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `RI_gvU`,
        text: `А сколько игр в комплекте?`
      },
      {
        id: `nuKo8q`,
        text: `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? А сколько игр в комплекте? Вы что?! В магазине дешевле. Совсем немного...`
      },
      {
        id: `rK0F3a`,
        text: `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    id: `QKFom5`,
    title: `Продам советскую посуду. Почти не разбита.`,
    picture: `item10.jpg`,
    description: `Если найдёте дешевле — сброшу цену. Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. Кажется, что это хрупкая вещь.`,
    type: `offer`,
    sum: 95806,
    category: [
      `Книги`
    ],
    comments: [
      {
        id: `ghi2Cj`,
        text: `Почему в таком ужасном состоянии? Совсем немного... А где блок питания? А сколько игр в комплекте? Вы что?! В магазине дешевле.`
      },
      {
        id: `LfJFT8`,
        text: `Вы что?! В магазине дешевле.`
      },
      {
        id: `vTNcFz`,
        text: `А сколько игр в комплекте? Оплата наличными или перевод на карту? Совсем немного...`
      }
    ]
  },
  {
    id: `bMugbh`,
    title: `Продам отличную подборку фильмов на VHS.`,
    picture: `item03.jpg`,
    description: `Даю недельную гарантию. Кому нужен этот новый телефон, если тут такое...`,
    type: `sale`,
    sum: 99226,
    category: [
      `Книги`,
      `Журналы`,
      `Разное`,
      `Посуда`
    ],
    comments: []
  },
  {
    id: `lZOCb-`,
    title: `Продам советскую посуду. Почти не разбита.`,
    picture: `item14.jpg`,
    description: `Продаю с болью в сердце... Две страницы заляпаны свежим кофе.`,
    type: `offer`,
    sum: 57372,
    category: [
      `Посуда`
    ],
    comments: [
      {
        id: `_ZvtBt`,
        text: `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле.`
      },
      {
        id: `IjAszd`,
        text: `А сколько игр в комплекте? Оплата наличными или перевод на карту? А где блок питания? Совсем немного... С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    id: `9xnoGi`,
    title: `Продам новую приставку Sony Playstation 5.`,
    picture: `item16.jpg`,
    description: `Товар в отличном состоянии. Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки. Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь.`,
    type: `offer`,
    sum: 95261,
    category: [
      `Книги`,
      `Разное`,
      `Посуда`,
      `Журналы`
    ],
    comments: [
      {
        id: `1nZOSK`,
        text: `Неплохо, но дорого А сколько игр в комплекте? Совсем немного...`
      },
      {
        id: `trpmP3`,
        text: `А где блок питания?`
      }
    ]
  },
  {
    id: `Mcz10v`,
    title: `Отдам в хорошие руки подшивку «Мурзилка».`,
    picture: `item05.jpg`,
    description: `Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера! Кому нужен этот новый телефон, если тут такое... Продаю с болью в сердце... Бонусом отдам все аксессуары.`,
    type: `sale`,
    sum: 23825,
    category: [
      `Книги`,
      `Игры`,
      `Посуда`
    ],
    comments: []
  }
];

const newOffer = {
  title: `Отдам в хорошие руки подшивку «Мурзилка».`,
  picture: `item09.jpg`,
  description: `Даю недельную гарантию. Бонусом отдам все аксессуары. Пользовались бережно и только по большим праздникам. При покупке с меня бесплатная доставка в черте города.`,
  type: `sale`,
  sum: 85401,
  category: [
    `Игры`,
    `Животные`
  ],
};

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offers(app, new OfferDataService(cloneData), new CommentDataService());
  return app;
};

describe(`API возвращает список офферов`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers`);
  });

  test(`Статус ответа равен 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Количество офферов равно 10`, () => {
    expect(response.body.length).toBe(mockData.length);
  });

  test(`id первого оффера равно "ZqDqVs"`, () => {
    expect(response.body[0].id).toBe(`ZqDqVs`);
  });
});

describe(`API возвращает определенный оффер`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/ZqDqVs`);
  });

  test(`Статус ответа равен 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Заголовок первого оффера равен "Продам коллекцию журналов «Огонёк»."`, () => {
    expect(response.body.title).toBe(`Продам коллекцию журналов «Огонёк».`);
  });
});

describe(`API создает новый оффер`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });

  test(`Статус ответа равен 201`, () => {
    expect(response.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Заголовок созданного офера равен "Отдам в хорошие руки подшивку «Мурзилка»."`, () => {
    expect(response.body.title).toBe(`Отдам в хорошие руки подшивку «Мурзилка».`);
  });

  test(`Количество офферов после создания нового равно 11`, () => {
    return request(app)
      .get(`/offers`)
      .expect((res) => expect(res.body.length).toBe(11));
  });

  test(`Возвращает созданный ранее оффер`, () => {
    const newOfferId = response.body.id;
    return request(app)
      .get(`/offers/${newOfferId}`)
      .expect((res) => expect(res.body.id).toBe(newOfferId));
  });
});

describe(`API не создает оффер, если данные невалидны`, () => {
  const app = createAPI();

  test(`Статус ответа 400 если обязательное свойство отсутствует`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API изменяет оффер, если данные валидны`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/ZqDqVs`)
      .send(newOffer);
  });

  test(`Оффер успешно обновляется`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`API возвращает обновленный оффер`, () => {
    expect(response.body).toEqual(expect.objectContaining(newOffer));
  });

  test(`Тип обновленного оффера равен "sale"`, () => {
    expect(response.body.type).toBe(`sale`);
  });

  test(`Оффер действительно измениля`, () => {
    return request(app)
      .get(`/offers/ZqDqVs`)
      .expect((res) => expect(res.body.title).toBe(`Отдам в хорошие руки подшивку «Мурзилка».`));
  });
});

test(`API возвращает 404, если редактируемый оффер не найден`, () => {
  const app = createAPI();

  return request(app)
    .put(`/offers/foobar`)
    .send(newOffer)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API корректно удаляет оффер`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/ZqDqVs`);
  });

  test(`Cервер вернул 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Был удален оффер с id "ZqDqVs"`, () => {
    expect(response.body.id).toBe(`ZqDqVs`);
  });

  test(`Количество офферов после удаления изменилось`, async () => {
    const res = await request(app).get(`/offers`);
    expect(res.body.length).toBe(9);
  });
});

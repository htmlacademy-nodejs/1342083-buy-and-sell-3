'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (api, service) => {
  api.use(`/comments`, route);

  route.get(`/`, async (req, res) => {
    const comments = await service.findAll();
    res.status(HttpCode.OK).json(comments);
  });
};

'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (api, service) => {
  api.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    const {query = `a`} = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).json([]);
    }

    const searchResults = service.findAll(query);
    const searchStatus = searchResults.length ? HttpCode.OK : HttpCode.NOT_FOUND;
    return res.status(searchStatus).send(searchResults);
  });
};

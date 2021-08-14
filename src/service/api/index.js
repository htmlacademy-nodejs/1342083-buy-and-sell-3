'use strict';

const {Router} = require(`express`);
const {getMockData} = require(`../lib`);
const categories = require(`./categories`);
const offers = require(`./offers`);
const search = require(`./search`);
const comments = require(`./comments`);
const {
  CategoryService,
  OfferService,
  SearchService,
  CommentService,
} = require(`../data-service`);

const api = new Router();

(async () => {
  const mockData = await getMockData();
  const categoryService = new CategoryService(mockData);
  const offerService = new OfferService(mockData);
  const commentService = new CommentService(mockData);
  const searchService = new SearchService(mockData);

  categories(api, categoryService);
  offers(api, offerService, commentService);
  search(api, searchService);
  comments(api, commentService);
})();

module.exports = api;

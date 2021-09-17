'use strict';

const {Router} = require(`express`);
const {HttpCode, Message} = require(`../../constants`);
const {commentValidator, offerExists, offerValidator} = require(`../middlewares`);

const route = new Router();

module.exports = (api, offerService, commentService) => {
  api.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const offers = await offerService.findAll();
    res.status(HttpCode.OK).json(offers);
  });

  route.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    res.status(HttpCode.OK).json(offer);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findOne(offer);
    res.status(HttpCode.OK).json(comments);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);
    res.status(HttpCode.CREATED).json(offer);
  });

  route.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const newComment = commentService.create(offer, req.body);
    return res.status(HttpCode.OK).json(newComment);
  });

  route.put(`/:offerId`, [offerExists(offerService), offerValidator], (req, res) => {
    const {offerId} = req.params;
    const updatedOffer = offerService.update(offerId, req.body);
    res.status(HttpCode.OK).json(updatedOffer);
  });

  route.delete(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.drop(offerId);
    res.status(HttpCode.OK).json(deletedOffer);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const droppedComment = commentService.drop(offer, commentId);

    if (!droppedComment) {
      return res.status(HttpCode.NOT_FOUND).send(Message.NOT_FOUND);
    }

    return res.status(HttpCode.OK).json(droppedComment);
  });
};

'use strict';

const {HttpCode, Message} = require(`../../constants`);

const OFFER_KEYS = [`title`, `picture`, `description`, `type`, `sum`, `category`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = OFFER_KEYS.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(Message.BAD_REQUEST);
  }

  return next();
};

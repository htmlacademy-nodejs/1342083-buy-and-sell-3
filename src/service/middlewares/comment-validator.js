'use strict';

const {HttpCode, Message} = require(`../../constants`);

const COMMENT_KEYS = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = COMMENT_KEYS.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(Message.BAD_REQUEST);
  }

  return next();
};

'use strict';

const {getRandomId} = require(`../../utils`);

class CommentService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer, comment) {
    const newComment = {
      id: getRandomId(),
      ...comment,
    };

    offer.comments.push(newComment);
    return newComment;
  }

  drop(offer, commentId) {
    const dropComment = offer.comments.find((comment) => comment.id === commentId);
    if (!dropComment) {
      return null;
    }

    offer.comments = offer.comments.filter((comment) => comment.id !== commentId);
    return dropComment;
  }

  findAll() {
    return this._offers.reduce((acc, offer) => {
      const {comments} = offer;

      if (comments.length) {
        acc.push(comments);
      }
      return acc;
    }, []);
  }

  findOne(offer) {
    return offer.comments;
  }
}

module.exports = CommentService;

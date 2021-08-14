'use strict';

const {getRandomId} = require(`../../utils`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = {
      id: getRandomId(),
      comments: [],
      ...offer,
    };

    this._offers.push(newOffer);
    return newOffer;
  }

  drop(id) {
    const offer = this.findOne(id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);
    return offer;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  update(id, offer) {
    const oldOffer = this.findOne(id);
    return Object.assign(oldOffer, offer);
  }
}

module.exports = OfferService;

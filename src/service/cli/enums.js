
'use strict';

const DescriptionRestrict = {
  MIN: 1,
  MAX: 5,
};

const PictureIndexRestrict = {
  MIN: 1,
  MAX: 16,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

module.exports = {
  DescriptionRestrict,
  PictureIndexRestrict,
  OfferType,
  SumRestrict,
};

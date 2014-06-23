/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var transliterate = require('../libs/transliterate');
module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string',
      required: true
    },
    author: {
      type: 'string'
    },
    url: {
      type: 'string'
    }
  },

  beforeCreate: function (values, next) {
    if ( !values.url ) {
      values.url = transliterate(values.title);
    }
    next();
  }
};


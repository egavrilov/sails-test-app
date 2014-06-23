/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  all: function (req, res) {
    Post.find()
      .sort('createdAt desc')
      .exec(function (err, data) {
        return res.view('post/all', { posts: data });
      });
  },
  add: function (req, res) {
    Post.create(req.body)
      .exec( function (err, data) {
        return res.redirect('/post/'+ data.url);
      })
  }
};


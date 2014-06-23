/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  all: function (req, res) {
    Post.find()
      .exec(function (err, data) {
        return res.render('post/all', { posts: data });
      });
//    return res.send("Hi there!");
  }
};


/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var POSTS_PER_PAGE = 10;

module.exports = {
  list: function (req, res) {
    var posts = Post.find(),
        offset = (req.param('page') || 1) - 1;

    posts.skip(offset * POSTS_PER_PAGE);

    posts.sort('createdAt desc')
      .exec(function (err, data) {
        if (err) {
          return res.badRequest(err);
        }
//      return res.json({posts:data});
      return res.view('post/list', { posts: data });
      });
  },
  add: function (req, res) {
    Post.create(req.body)
      .exec( function (err, post) {
        console.log(post);
        if (err) {
          return res.serverError(err);
        }
        return res.redirect('/post/' + post.url);
      })
  },

  edit: function (req, res) {
    Post.findOne({
      url: req.param('cleanUrl')
    }, function (err, post) {
      if ( err || !post ) {
        return res.notFound(err||'No such post');
      }
      console.log(post);
      return res.view('post/edit', {post: post});
    })
  },

  update: function (req, res) {
    Post.update(
      req.body.id,
      req.body,
      function (err, post) {
        if (err || !post[0]) {
          return res.serverError(err||'No such post');
        }
        post = post[0];

        return res.redirect('/post/' + post.url);
      }
    )
  },

  single: function (req, res){
    Post.findOne({
      url: req.param('cleanUrl')
    }, function (err, post) {
      if (err || !post) {
        return res.notFound(err||'No such post');
      }
      console.log(post);
      return res.view('post/single', {post: post});
    })
  }
};


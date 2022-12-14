const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require ('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ], 
    include:[
      {
        model: Comment,
        attributes : ['id', 'comment_text', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    //pass a single post object into the homepage template
    const posts = dbPostData.map(post => post.get({ plain: true }));// this will loop over and map each sequilze object inot a serialized version of itself saving the results in a new posts array.
    //console.log(dbPostData[0]);
    res.render('homepage', {posts});
    
  })
  
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  });

  router.get('/login', (req ,res) =>{
    if (res.session.loggedIn){
    res.redirect('/')
    return;
    }
    res.render('login');
  })

});

module.exports = router;
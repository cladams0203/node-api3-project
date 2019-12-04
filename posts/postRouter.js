const express = require('express');

const router = express.Router();

const postDb = require('./postDb')

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({message: 'failed to get posts'})
    })

});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.getById(req.post)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({message: 'failure to load posts'})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.remove(req.post)
    .then(post => {
      res.status(200).json({message: 'post was removed'})
    })
    .catch(err => {
      res.status(500).json({message: 'unable to remove post'})
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  !req.body.text ?
  res.status(400).json({message: 'need text field to update'}) :
  postDb.update(req.post, req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({message: 'falure to update post'})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postDb.getById(req.params.id)
    .then(post => {
      if(post) {
        req.post = post.id
        next()
      } else {
        res.status(400).json({message: 'Invalid post id'})
      }
    })
}

module.exports = router;

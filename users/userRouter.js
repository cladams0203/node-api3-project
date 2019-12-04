const express = require('express');

const router = express.Router();
const userDb = require('./userDb')
const postDb = require('../posts/postDb')




router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({message: 'failed to add user'})
    })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
  !req.body.user_id ?
  res.status(400).json({message: 'require user id field in body'}) :
  postDb.insert(req.body)
    .then(userPost => {
      res.status(200).json(userPost)
    })
    .catch(err => {
      res.status(500).json({message: 'unable to add post to user'})
    })
  
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: 'page could not load'})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.getById(req.user.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: 'could not load page'})
    })
  
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userDb.getUserPosts(req.user.id)
    .then(userPost => {
      res.status(200).json(userPost)
    })
    .catch(err => {
      res.status(500).json({message: 'could nopt load page'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.remove(req.user.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: 'could not load page'})
    })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // do your magic!
  userDb.update(req.user.id, req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({message: 'unable to update user information'})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  userDb.getById(req.params.id)
    .then(user => {
      if(user) {
        req.user = user
        next()
      }else{
        res.status(400).json({message: "invalid user id" })
      }
      
    })
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.body)
  if(!req.body) {
  res.status(400).json({ message: "missing user data" })
  } else if(!req.body.name) {
    res.status(400).json({message: "missing required name field" })
  } else {
    next()
  }
   
  
}

function validatePost(req, res, next) {
  // do your magic!
  !req.body ?
  res.status(400).json({ message: "missing post data" }) :
  !req.body.text ?
  res.status(400).json({ message: "missing required text field" }) :
  next()
}

module.exports = router;

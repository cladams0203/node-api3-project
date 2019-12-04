const express = require('express');

const router = express.Router();
const userDb = require('./userDb')



router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
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

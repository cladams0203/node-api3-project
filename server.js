const express = require('express');
const userDb = require('./users/userDb')

const server = express();

server.use(logger)

server.get('/:id',validateUserId, (req, res) => {

})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at ${new Date().toISOString()}`)
  
  next()
}
function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
    .then(user => console.log(user))
  next();
}

module.exports = server, validateUserId;

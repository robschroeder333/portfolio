const express = require('express');
const app = express();
module.exports = app
  .use(express.static(__dirname + '/public'))
  .get('/', (req, res, next) => res.render('index'))
  .get('/', (err, req, res, next) => console.error(err))
  .listen(process.env.PORT || 6060, (req, res, next) => console.log('listening on 6060'));

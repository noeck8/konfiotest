'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken")/*,
  osmosis = require('osmosis')*/;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});





/*Task = mongoose.model('Tasks');
var product;
osmosis
   .get('https://www.liverpool.com.mx/tienda/tenis-sneakers/N-2xrc')
   .paginate('#controls-pagination a[href]', 0)
   .find('.products-list .product-cell')
   .set({'name': '.product-name span',
         'description': '.product-name span',
         'price': '.subset-pricing .price-amount'})
   //.data(console.log)
    .data(function(data) {
        //console.log(data);
        //nextUrl = data['name'];
        //product.price = Math.floor(parseFloat(data['price']));
        product = new Task(data);
        product.price = data['price'].substring(0, data['price'].length-2);
        console.log('Prod:' + JSON.stringify(product));
    })
   .log(console.log) // enable logging
   .error(console.error) // in case there is an error found.
*/




app.listen(port);

console.log('Server started on: ' + port);

module.exports = app;
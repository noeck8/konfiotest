'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  osmosis = require('osmosis');



exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {

  //Task.remove({ }, function(err, task){ if (err) res.send(err); });

  var store = req.body.store;
  var numProd = req.body.elements == undefined ? 10 : req.body.elements;
  console.log(store + ' - ' + numProd);
  //var new_task = new Task(req.body);
  var product,
      products=[],
      counter = 0;

  switch (store)
  {
     case "liverpool":
        osmosis
           .get('https://www.liverpool.com.mx/tienda/tenis-sneakers/N-2xrc')
           .paginate('#controls-pagination a[href]', Math.floor(numProd/60))
           .find('.products-list .product-cell')
           .set({'name': '.product-name span',
                 'description': '.product-name span',
                 'price': '.subset-pricing .price-amount'})
           //.data(console.log)
            .then(function(context, data, next, done) {
                if (data.name != undefined && counter < numProd){
                  product = new Task(data);
                  product.price = '$' + data['price'].substring(0, data['price'].length-2);
                  product.store = store;
                  console.log('Prod: '+ product);

                  product.save(function(err, task) {
                    if (err)
                      return err;
                    //res.json(task);
                  });

                  counter++;
                }
                else{
                  done();
                }
            })
           .log(console.log) // enable logging
           .error(console.error) // in case there is an error found.
            res.json({ message: 'The liverpool products has been added.' });
        break;
     case "linio":
        osmosis
           .get('https://www.linio.com.mx/c/deportes/ropa-y-calzado-deportivo-hombre')
           .paginate('.pagination li a[href]', Math.floor(numProd/60))
           .find('.catalogue-product-sm-container .catalogue-product')
           .set({'name': '.title-section',
                 'description': '.title-section',
                 'price': '.price-section .price-secondary'})
           //.data(console.log)
            .then(function(context, data, next, done) {
                if (data.name != undefined && counter < numProd){
                  product = new Task(data);
                  product.price = data['price'].substring(0, data['price'].length-3);
                  product.store = store;
                  console.log('Prod: '+ product);

                  product.save(function(err, task) {
                    if (err)
                      return err;
                    //res.json(task);
                  });

                  counter++;
                }
                else{
                  done();
                }
            })
           .log(console.log) // enable logging
           .error(console.error) // in case there is an error found.
            res.json({ message: 'The linio products has been added.' });
        break;
     case "netshoes":
        osmosis
           .get('https://www.netshoes.com.mx/busca?mi=hm_sc_mntop_categor%C3%ADas_220517&psn=Menu_Top&tst=ns&nsCat=Artificial')
           .paginate('.ns-pagination a[href]', Math.floor(numProd/60))
           .find('.wrapper .ns-w')
           .set({'name': '.n-block a span',
                 'description': '.n-block a span',
                 'price': '.pr .price-block span[2]'})
           //.data(console.log)
            .then(function(context, data, next, done) {
                if (data.name != undefined && counter < numProd){
                  product = new Task(data);
                  product.price = '$' + data['price'].substring(0, data['price'].length-3);
                  product.store = store;
                  console.log('Prod: '+ product);

                  product.save(function(err, task) {
                    if (err)
                      return err;
                    //res.json(task);
                  });

                  counter++;
                }
                else{
                  done();
                }
            })
           .log(console.log) // enable logging
           .error(console.error) // in case there is an error found.
            res.json({ message: 'The netshoes products has been added.' });
        break;
     default:
         res.json({ message: 'Can´t scrap that site...' });
         break;
  }
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {

  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};



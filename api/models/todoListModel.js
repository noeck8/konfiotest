'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    uppercase: true
  },
  description: {
    type: String,
    uppercase: true
  },
  price: {
    type: String,
    default: '0.0'
  },
  store: {
    type: String,
    uppercase: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending'
  }
}, { runSettersOnQuery: true });


module.exports = mongoose.model('Tasks', TaskSchema);
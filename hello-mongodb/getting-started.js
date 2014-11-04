'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var kittySchema = mongoose.Schema({name: String});

kittySchema.methods.speak = function() {
  console.log(this.name, 'is saved.');
};

var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({name: 'Silence'});
var fluffy = new Kitten({name: 'Fluffy'});
var numKittensFound = 0;

var foundOrSavedKitty = function() {
  if (++numKittensFound >= 2) {
    Kitten.find(function(err, kittens) {
      if (!err) {
        console.log(kittens.length + ' kittens found.');
        mongoose.disconnect();
      }
    });
  }
};

var findKitty = function(key, kitty) {
  Kitten.find(key, function(err, kittens) {
    if (!err) {
      if (kittens.length) {
        console.log(kittens);
        foundOrSavedKitty();
      } else {
        kitty.save(function(err) {
          if (!err) {
            kitty.speak();
            foundOrSavedKitty();
          }
        });
      }
    }
  });
};

db.once('open', function() {
  findKitty({name: /^Silence/}, silence);
  findKitty({name: /^Fluff/}, fluffy);
});

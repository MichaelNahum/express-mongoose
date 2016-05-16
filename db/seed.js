var mongoose = require("./connection.js");
var seedData = require("./seeds.json");

var Candidate = mongoose.model("Candidate");

Candidate.remove().then(function(){
  Candidate.collection.insert(seedData).then(function(){
    process.exit();
  });
});
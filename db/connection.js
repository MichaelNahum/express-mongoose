var mongoose = require("mongoose");

var CandidateSchema = new mongoose.Schema({

  name: String,
  year: Number

});

mongoose.model("Candidate", CandidateSchema);
if(process.eng.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
} else {
  mongoose.connect("mongodb://localhost/whenprez");
}


module.exports = mongoose;

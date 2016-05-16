var express       = require("express");
var hbs           = require("express-handlebars");
var mongoose      = require("./db/connection");
var parser        = require("body-parser");

var app           = express();

var Candidate = mongoose.model("Candidate");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
    Candidate.find().then(function(candidatesFromDB){
      res.render("candidates-index", {
        candidates: candidatesFromDB
      });
    });
});

app.get("/candidates/:name", function(req, res){
  Candidate.findOne(req.params).then(function(candidateFromDB){
    res.render("candidates-show", {
      candidate: candidateFromDB
    });
  });
});

app.post("/candidates", function(req, res){
  console.log(req.body)
  Candidate.create(req.body.candidate).then(function(candidate){
    res.redirect("/candidates/" + candidate.name);
  });
});

app.post("/candidates/:name", function(req, res){
  Candidate.findOneAndUpdate(req.params, req.body.candidate, {new:true}).then(function(updateCandidate){
    res.redirect("/candidates/" + updateCandidate.name);
  });
});

app.post("/candidates/:name/delete", function(req, res){
  Candidate.findOneAndRemove({name: req.params.name}).then(function(){
    res.redirect("/candidates");
  });
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
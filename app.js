var koa = require('koa');
var router = require('koa-router');
var bodyParser = require('koa-body');
var cors = require('kcors');
var mongoose = require('mongoose');

var app = koa();

app.use(cors());

// Set up body parsing middleware
app.use(bodyParser({
    formidable:{uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
}));

var _ = router(); //Instantiate the router

mongoose.connect('mongodb://localhost/my_db');
mongoose.Promise = global.Promise;

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});

var Person = mongoose.model("Person", personSchema);

var personQuerySchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});

var PersonQuery = mongoose.model("PersonQuery", personQuerySchema);


_.post('/person', createPersonWorker);

function *createPersonWorker(next){
    console.log(this.request.body);
    var self = this;
    var personInfo = this.request.body; //Get the parsed information
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
        self.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
    }
    else{
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });
        console.log(newPerson);
        yield newPerson.save(function(err){
            if(err) {
                self.render('show_message', {message: "Database error", type: "error"});
            } else {
                var newPersonQuery = new PersonQuery({
                    name: personInfo.name,
                    age: personInfo.age,
                    nationality: personInfo.nationality
                });
                newPersonQuery.save(function(err) {
                    if (err) {
                        self.render('show_message', {message: "Database error", type: "error"});
                    }
                });
                this.status = 200;
                this.body = {message: 'success'};
            }
        });
    }
}

_.get('/person', getPerson);

function *getPerson(next){
    var self = this;
    console.log('request received');
    yield PersonQuery.find({}, function (err, docs) {
        console.log(docs);
        self.body = docs;
    });
}

app.use(_.routes());
app.listen(3000);
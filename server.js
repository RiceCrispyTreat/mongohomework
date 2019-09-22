let express = require ('express');
let mongoose = require('mongoose');
let expressHandlebars = require('express-handlebars');
let PORT = process.env.PORT || 3000;

let app = express();

let router = express.Router();

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

let db = process.env.MONGO_URL || 'mongodb://localhost/mongoHeadlines',

mongoose.connect(db, function(error){
    if(error) {
        console.log(error);
    }
    else{
        console.log('mongoose connection is successful');
    }
})

app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  
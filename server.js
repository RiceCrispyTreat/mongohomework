let express = require ('express');
let mongoose = require('mongoose');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');


let PORT = process.env.PORT || 3000;

let app = express();

let router = express.Router();
require('.config/routes')(router);
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
`// DB connection
require('dotenv').config()
var db = require("./models");
var MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI),
.then(()=>console.log("DB connected"))

app.listen(3000, function() {
    console.log("App running on port 3000!");
});

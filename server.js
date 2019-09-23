let express = require ('express');
let mongoose = require('mongoose');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
mongoose.Promise = Promise;

let PORT = process.env.PORT || 3000;

let app = express();

let router = express.Router();
require('./config/routes')(router);
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

// DB connection
require('dotenv').config()

let headline = require("./models/headline");
let note = require('./models/note');
let MONGODB_URI = process.env.MONGO_URL || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI)
        .then(()=>console.log("DB connected"))

app.listen(PORT, function() {
    console.log("App running on port 3000!");
});

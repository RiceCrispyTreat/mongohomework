let express = require ('express');

let PORT = process.env.PORT || 3000;

let app = express();

let router = express.Router();

app.use(express.static(__dirname + '/public'));

app.use(router);

app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  
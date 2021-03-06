let scrape = require("../scripts/scrape");

let headlinesController = require("../controllers/headlines");
let notesController = require("../controllers/notes");

module.exports = function(router) {
  router.get("/", function(req, res) {
    res.render("home");
  });

  router.get("/saved", function(req, res) {
    res.render("layouts/saved");
  });

  router.get("/api/fetch", function(req, res) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "Sorry no new articles today. Check again tomorrow"
        });
      } else {
        res.json({
          meassage: "Added" + docs.insertedCount + " new articles!!"
        });
      }
    });
  });

  router.get("/api/headlines", function(req, res) {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    }
    headlinesController.get(query, function(data) {
      res.json(data);
    });
  });

  router.delete("/api/headlines/:id"),
    function(req, res) {
      let query = {};
      query._id = req.params.id;
      headlinesController.delete(query, function(err, data) {
        res.json(data);
      });
    };

  router.patch("/api/headlines", function(req, res) {
    headlinesController.update(req.body, function(err, data) {
      res.json(data);
    });
  });
};

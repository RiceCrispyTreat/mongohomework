let scrape = require("../scripts/scrape");
let makeDate = require("../scripts/date");

let Headline = require("../models/headline");
module.exports = {
  fetch: function(callback) {
    scrape(function(data) {
      let articles = data;
      for (let i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
      }

      Headline.collection.insertMany(articles, { ordered: false }, function(
        err,
        docs
      ) {
        callback(err, docs);
      });
    });
  },
  delete: function(query, callback) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {
    Headline.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        cb(doc);
      });
  },

  update: function(query, cb) {
    Headline.update(
      { _id: query._id },
      {
        $set: query
      },
      {},
      cb
    );
  }
};

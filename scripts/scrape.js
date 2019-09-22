let request = require("request");
let cheerio = require("cheerio");

//scrape articles from the New YorK Times
let scrape = function(callback) {

  let articlesArr = [];

  request("https://www.nytimes.com/", function(error, response, html) {

      let $ = cheerio.load(html);


      $("h2.story-heading").each(function(i, element) {

          let result = {};

          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this).children("a").text();
          result.link = $(this).children("a").attr("href");

          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });
      callback(articlesArr);
  });

};

module.exports = scrape;
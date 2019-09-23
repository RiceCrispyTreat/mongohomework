let request = require("request");
let cheerio = require("cheerio");

//scrape articles from the New YorK Times
let scrape = function(callback) {
  let articlesArr = [];

  request("https://www.digg.com/", function(error, response, html) {
    let $ = cheerio.load(html);

    $(".headline").each(function(i, element) {
      let result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.headline = $(this)
        .children("a")
        .text()
        .trim();
      //result.link = $(this)
      //  .children("a")
      //  .attr("href");

      if (
        result.headline !== "" &&
        //result.link !== "" &&
        articlesArr.findIndex(a => a.headline === result.headline) === -1
      ) {
        articlesArr.push(result);
      }
    });
    callback(articlesArr);
  });
};

module.exports = scrape;

$(document).ready(function() {
  let articleContainer = $(".article-container");

  $(document).on("click", ".btn.delete", handleArticleDelete);

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    let articlePanels = [];

    for (let i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    let panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-danger delete'>",
        "Delete from saved",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );

    panel.data("_id", article._id);
    return panel;
  }

  function handleArticleDelete() {
    let handleArticleDelete = $(this)
      .parents(".panel")
      .data();
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }
});

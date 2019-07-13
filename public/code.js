function doGet(req) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Tweet Depot');
}

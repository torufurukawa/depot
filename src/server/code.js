global.doGet = () => {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('TweetDepot')
    .addMetaTag('viewport', 'width=device-width,initial-scale=1.0');
};

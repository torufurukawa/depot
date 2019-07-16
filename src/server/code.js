global.doGet = () => {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('TweetDepot')
    .addMetaTag('viewport', 'width=device-width,initial-scale=1.0');
};

//
// API
//

global.getTweets = () => {
  return [{id: '1146708814713896964'}];
};

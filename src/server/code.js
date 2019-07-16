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

global.getSettings = () => {
  const kvs = PropertiesService.getScriptProperties();
  const spreadseetID = kvs.getProperty('SPREADSHEET_ID');
  return {spreadsheetID: spreadseetID};
};

global.setSettings = (settings) => {
  const kvs = PropertiesService.getScriptProperties();
  kvs.setProperty('SPREADSHEET_ID', settings.spreadsheetID || '');
};

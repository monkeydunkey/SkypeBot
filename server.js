const fs = require('fs');
const restify = require('restify');
const skype = require('skype-sdk');
const brain = require('./brain');

var oConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const botService = new skype.BotService({
    messaging: {
        botId: oConfig.botId,
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: oConfig.APP_ID,
        appSecret: oConfig.APP_SECRET
    }
});

botService.on('contactAdded', (bot, data) => {
    bot.reply(`Hello ${data.fromDisplayName}!`, true);
});

botService.on('personalMessage', (bot, data) => {
  var messageCommand = brain.commandExtractor(data.content); //Checking if there is any command associated with the message
      sReturnMessage = "",
      iRandomValue = Math.floor((Math.random() * data.content.length) + 1),
      iCount = 0;
  if(messageCommand != null){ // If there is a command
    if(oConfig.scripts.hasOwnProperty(messageCommand.replace("-",""))){ // If the command specified actually exists
        sReturnMessage = brain.oScriptLists[messageCommand.replace("-","")].reply(data.content) ;
    } else {
      sReturnMessage = brain.help();
    }
  } else { // create a string of random 'HODOR' words
    for(iCount = 0; iCount < iRandomValue; iCount++){
      sReturnMessage += "Hodor ";
    }
  }
  bot.reply(sReturnMessage, true);
});


const server = restify.createServer();
server.post('/v1/chat', skype.messagingHandler(botService));
const port = process.env.PORT || 8080;
server.listen(port);
console.log('Listening for incoming requests on port ' + port);

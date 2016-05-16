// reference to the brain of the bot
const brain = require('../brain.js');
const request = require('request');

var CommandPatt = /\[(.*?)\]/g, // This regex pattern is used to map the required commands out of the text
    APIUrl = 'http://memegen.link';

var getTemplates = function(bot){
    request(APIUrl + '/templates', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = body.replace("{","").replace("}","").replace(",","\n");
        console.log(brain.sendMessage);
        brain.sendMessage(bot,body);
      }
    })
  return "...";
}
//There has to be another reply while the script waits for the API to respond
var reply = function(command,bot){

  var commandList = command.match(CommandPatt);
  if(commandList.length === 1){
    if(commandList[0].indexOf('template') > 0)
    {
      return getTemplates(bot);
    }
  }
  return "To be implemented";
}

// There should be a default help option for each script
var help = function(){
  return "USAGE: //meme --[template] --(Top Message; Lower Message)  \n To get the templates visit - Link";
}

module.exports = {
    reply, help
}

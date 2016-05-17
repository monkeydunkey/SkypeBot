// reference to the brain of the bot
const brain = require('../brain.js');
const request = require('request');

var CommandPatt = /\[(.*?)\]/g, // This regex pattern is used to map the required commands out of the text
    APIUrl = 'http://memegen.link';

//Uses callback function to return the API response
var getTemplates = function(bot, callback){
    request(APIUrl + '/templates', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = body.replace("{","").replace("}","").replace(/", "/g,"\n");
        callback(bot,body);
      }
    })
  return "...";
}

var getMeme = function(bot, callback, templateLink, upperText, lowerText){

  request(templateLink + '/' + upperText + '/' + lowerText , function (error, response, body) {
    if (!error && response.statusCode == 200) {
      bodyParsed = JSON.parse(body);
      callback(bot,bodyParsed.direct.visible);
    }
  })
return "...";
}
//There has to be another reply while the script waits for the API to respond
var reply = function(command,bot, callback){
  var commandList = command.match(CommandPatt);
  if(commandList.length === 1){
    if(commandList[0].indexOf('template') > 0)
    {
      return getTemplates(bot, callback);
    } else {
      return help();
    }
  } else if(commandList.length > 0 ) {
    return getMeme(bot, callback, commandList[0].replace('[','').replace(']',''), commandList[1].replace('[','').replace(']','').split(';')[0], (!!commandList[1].replace('[','').replace(']','').split(';')[1]) ? commandList[1].replace('[','').replace(']','').split(';')[1]:"")
  } else {
    return help();
  }
  return "To be implemented";
}

// There should be a default help option for each script
var help = function(){
  return "USAGE: -meme [templateLink] [Top Message; Lower Message]  \n To get the template links visit - http://memegen.link/templates/ or write -meme [template]";
}

module.exports = {
    reply, help
}

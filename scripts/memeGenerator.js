// reference to the brain of the bot
var brain = require('../brain.js');

var CommandPatt = /\[(.*?)\]/g, // This regex pattern is used to map the required commands out of the text
    APIUrl = 'http://memegen.link/';

var getTemplates = function(bot){
  bot.reply("To be implemented");
}
var reply = function(command, callback){
  var commandList = command.match(CommandPatt);
  if(commandList.length = 1){
    if(commandList[0].indexOf('template') > 0)
    {
       getTemplates(bot);
    }
  }
  bot.reply("To be implemented");
}

// There should be a default help option for each script
var help = function(){
  return "USAGE: //meme --[template] --(Top Message; Lower Message)  \n To get the templates visit - Link";
}

module.exports = {
    reply, help
}

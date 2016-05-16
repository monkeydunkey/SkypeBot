const fs = require('fs');
const commandRegexPatt = / -\S+/; // This regex pattern is used to extract the command from the message
var oConfig = JSON.parse(fs.readFileSync('config.json', 'utf8')),
    oScriptLists = {};
// This gets all the user added scripts and its respective files
for (var obj in oConfig.scripts) {
    oScriptLists[obj] = require(oConfig.scripts[obj]);
}

var commandExtractor = function(command){
  return commandRegexPatt.exec(command);
}
var help = function(){
  var returnString = "Following are actions I can currently perform \n";
  for (var obj in oScriptLists) {
    returnString += obj.help();
  }
  return returnString;
}

var hodorGenerator = function () {
  var sReturnMessage = "",
      iRandomValue = Math.floor((Math.random() * data.content.length) + 1),
      iCount = 0;
  for(iCount = 0; iCount < iRandomValue; iCount++){
      sReturnMessage += "Hodor ";
  }
  return sReturnMessage;
}

// This is callback/message sending function
var sendMessage(bot, data){
    //// To be implemented
}

var messageHandlerHub(bot, data){
  var messageCommand = commandExtractor(data.content), //Checking if there is any command associated with the message
      sReturnMessage = "";
  sReturnMessage = (messageCommand != null) ? (oConfig.scripts.hasOwnProperty(messageCommand.replace("-",""))) ? oScriptLists[messageCommand.replace("-","")].reply(data.content, sendMessage) : brain.help() : hodorGenerator();
  bot.reply(sReturnMessage, true);
}

module.exports = {messageHandlerHub, sendMessage}

const fs = require('fs');
const commandRegexPatt = /-\S+/g; // This regex pattern is used to extract the command from the message
var oConfig = JSON.parse(fs.readFileSync('config.json', 'utf8')),
    oScriptLists = {};

function commandExtractor (command){
  return command.match(commandRegexPatt);
}
// Cleans the commmand and gets the actual command to be run, returns null if no command
function commandCleaner  ( messageCommand ) {
  var returnCommand = (messageCommand != null) ? oConfig.scripts.hasOwnProperty(messageCommand[0].replace("-","")) ? messageCommand[0].replace("-","") : null : "default";
  return returnCommand;
}

function help (){
  var returnString = "Following are actions I can currently perform \n";
  for (var obj in oScriptLists) {
    returnString += obj.help();
  }
  return returnString;
}



// This is the first function to be called when the server starts
var wakeUp = function() {
  // This gets all the user added scripts and its respective files
  for (var obj in oConfig.scripts) {
      oScriptLists[obj] = require(oConfig.scripts[obj]);
      oScriptLists[obj].wakeUp();
  }
}

// This is callback/message sending function
var sendMessage = function (bot, data){
    if(typeof data === "string"){
      bot.reply(data,true);
    } else if(typeof data === "object") {
      var oAttachmentData = {},
          aPropertyList = ["type","binaryContent"];
          bAreRequirementsMet = true;
      oAttachmentData.name = data.name || "";
      oAttachmentData.thumbnailContent = data.thumbnailContent || "";
      for(var prop in aPropertyList){
        if(data.hasOwnProperty(aPropertyList[prop])){
          oAttachmentData[aPropertyList[prop]] = data[prop];
        } else {
          bAreRequirementsMet = false;
          bot.reply("Something went wrong while processing the request. Hodor Sad :(",true);
          break;
        }
      }
      if(bAreRequirementsMet){
        bot.replyWithAttachment(oAttachmentData.name,oAttachmentData.type, oAttachmentData.binaryContent, oAttachmentData.thumbnailContent);
      }
    }
}

var messageHandlerHub = function (bot, data){
  var messageCommand = commandExtractor(data.content), //Checking if there is any command associated with the message
      sReturnMessage = "";
  messageCommand = commandCleaner(messageCommand);
  sReturnMessage = (messageCommand != null) ? oScriptLists[messageCommand].reply(data.content, bot, sendMessage) : help();
  sendMessage(bot,sReturnMessage);
}

module.exports = {messageHandlerHub, sendMessage, wakeUp}

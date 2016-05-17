const fs = require('fs');
const commandRegexPatt = /-\S+/g; // This regex pattern is used to extract the command from the message
var oConfig = JSON.parse(fs.readFileSync('config.json', 'utf8')),
    oScriptLists = {};
// This gets all the user added scripts and its respective files
for (var obj in oConfig.scripts) {
    oScriptLists[obj] = require(oConfig.scripts[obj]);
}

var commandExtractor = function(command){
  return command.match(commandRegexPatt);
}
var help = function(){
  var returnString = "Following are actions I can currently perform \n";
  for (var obj in oScriptLists) {
    returnString += obj.help();
  }
  return returnString;
}

var hodorGenerator = function (data) {
  var sReturnMessage = "",
      iRandomValue = Math.floor((Math.random() * data.content.length) + 1),
      iCount = 0;
  for(iCount = 0; iCount < iRandomValue; iCount++){
      sReturnMessage += "Hodor ";
  }
  return sReturnMessage;
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
        if(data.hasOwnProperty(prop)){
          oAttachmentData[prop] = data[prop];
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

  sReturnMessage = (messageCommand != null) ? (oConfig.scripts.hasOwnProperty(messageCommand[0].replace("-",""))) ? oScriptLists[messageCommand[0].replace("-","")].reply(data.content, bot, sendMessage) : brain.help() : hodorGenerator(data);
  sendMessage(bot,sReturnMessage);
}

module.exports = {messageHandlerHub, sendMessage}

///This handles storing and retreiving information regarding user who are connected to the bot
const fs = require('fs');
const sFolderLocation = '../';
const CommandPatt = /\[(.*?)\]/g;

//Populating data if no file is present
populateFileData = function(sSkypeUserName, userData ,oCallback){
  console.log(sFolderLocation+sSkypeUserName);
  console.log(userData);
  fs.writeFile(sFolderLocation+sSkypeUserName+'.json', JSON.stringify(userData), (err) => {
    if(err) console.log(err);
    else{
      sendMessageToBot(oCallback, 'The value was saved succesfully');
    }
  });
}

sendMessageToBot = function(oCallback, sMessage){
  if(!!oCallback.bot && !!oCallback.callback){
    oCallback.callback(oCallback.bot, sMessage);
  } else {
    console.log("The callback function was " + !!oCallback.callback + " and the bot object was "+!!oCallback.bot);
  }
}
getUserData = function (sSkypeUserName, sRequest, oCallback, callback) {
  fs.readFile(sFolderLocation+sSkypeUserName+'.json', (err, data) => {
    if (err) {
      sendMessageToBot(oCallback, "You haven't saved anything yet.");
    }
      else if(!JSON.parse(data).oUserData){
        sendMessageToBot(oCallback, "You haven't saved anything yet.");
      } else
        callback(data, sRequest, oCallback);
    });
}

saveUserData = function(sSkypeUserName, sKey, sMessage, oCallback){
  fs.readFile(sFolderLocation+sSkypeUserName+'.json', (err, data) => {
    var oUserData,
        oFileData;
    if (err) {
      oFileData = {};
      oFileData.oUserData = {};
      oFileData.oUserData[sKey] = sMessage;
      populateFileData(sSkypeUserName, oFileData, oCallback);
    }
    else {
      oFileData = JSON.parse(data);
      if(!oFileData.userData){
        oFileData.oUserData = {};
      }
      oFileData.oUserData[sKey] = sMessage;
      populateFileData(sSkypeUserName, oFileData, oCallback);
    }
    });
}
processUserData = function(data, sRequest, oCallback) {
  var oFileData = JSON.parse(data),
      oUserData = oFileData.oUserData;
      sResponse = (oUserData.hasOwnProperty(sRequest))?oUserData[sRequest]:"I dont have any information for "+sRequest;
      sendMessageToBot(oCallback, sResponse);
}

var reply = function(command, bot, callback){
  var commandList = command.match(CommandPatt),
      sKey,
      sMessage;

  if(commandList.length === 1){
    if(commandList[0].indexOf('help') > 0)
    {
      return help();
    } else {
      return help('The command entered is invalid. Please use the command below. \n');
    }
  } else if(commandList.length > 0 ) {
    if(commandList[0].indexOf('save') > 0){
      sKey = commandList[1].replace('[','').replace(']','').split(';')[0];
      sMessage = (!!commandList[1].replace('[','').replace(']','').split(';')[1]) ? commandList[1].replace('[','').replace(']','').split(';')[1]:"";

      saveUserData(bot._replyTo.replace(':',''),sKey, sMessage, {bot, callback} );
    } else {
      if(commandList[0].indexOf('get') > 0){
        sKey = commandList[1].replace('[','').replace(']','').split(';')[0];
        getUserData(bot._replyTo.replace(':',''), sKey, {bot, callback},processUserData );
      } else {
        return help('The comamnd entered is invalid. Please use the command below. \n');
      }
    }
  }
}

var help = function(sAdditionalMessage){
    return ((!!sAdditionalMessage) ? sAdditionalMessage : "" ) + 'Usage: -myData [get/save] [key;message]. \n message is not required when getting data.'
}

var wakeUp = function(){
  return;
}

module.exports = {
  reply, help, wakeUp
}

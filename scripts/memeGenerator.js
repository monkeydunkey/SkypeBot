/*
  Meme Generator: This script craetes memes based on the templates provided.
  ToDo: Add image post functionality instead of the current image URL
  ToDo: Try for using aliases instead of URL or template name
*/


// reference to the brain of the bot
const brain = require('../brain.js');
var request = require('request');
var fs = require('fs');


var CommandPatt = /\[(.*?)\]/g, // This regex pattern is used to map the required commands out of the text
    APIUrl = 'http://memegen.link',
    oLinkAlias = {};

function receivedError(bot, callback){
    callback(bot,'There was a problem with processing your request. Please recheck the parametrs or try again later for help please type -meme help')
}

function makeAPICall(url, data, callback){
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(data, body);
    } else {
      if(!!data.bot && !!data.callback){
        receivedError(data.bot, data.callback);
      } else {console.log("error received: " + error);}
    }
  })
}

function replyWithTemplates(bot, callback){
  var returnString = "";
  for(var obj in oLinkAlias){
    if(oLinkAlias.hasOwnProperty(obj)){
      returnString += obj + " : " + oLinkAlias[obj] + " \n ";
    }
  }
  callback(bot, returnString);
}

//Uses callback function to return the API response
function getTemplates (bot, callback){
  try {
    if(Object.keys(oLinkAlias).length === 0 && oLinkAlias.constructor === Object) {
      fs.readFile('./scripts/memeConfig.json', (err, data) => {
          if (err) throw err;
          oLinkAlias = JSON.parse(data);
          replyWithTemplates(bot, callback);
        });
        return "Hold on I am getting the templates";
    } else {
      replyWithTemplates(bot, callback);
    }
  } catch (e) {
    populateFileData(bot,callback);
  }
}

function getMemeTemplateLink(templateLink){
  var link = (templateLink.indexOf('http://memegen.link/templates/') > 0) ? templateLink : oLinkAlias.hasOwnProperty(templateLink) ? oLinkAlias[templateLink] : "na";
  return link;
}

function getMeme (bot, callback, templateLink, upperText, lowerText){
  request(getMemeTemplateLink(templateLink) + '/' + upperText + '/' + lowerText , (error, response, body) => {
    if (!error && response.statusCode == 200) {
      bodyParsed = JSON.parse(body);
      request(bodyParsed.direct.visible, {encoding: 'binary'}, (error, response, body) => {
        fs.writeFile('downloaded.jpg', body, 'binary', function (err) {});
        var encodedImage = new Buffer(body, 'binary').toString('base64');
        callback(bot,{"type": "Image", "binaryContent": body});
      })

      callback(bot,bodyParsed.direct.visible);
    } else {
      callback(bot, help("The provided template does not exits. \n"))
    }
  });
return "...";
}

function processTemplates(data, body){
  body = JSON.parse(body);
  oLinkAlias = body;
  fs.writeFile("./scripts/memeConfig.json", JSON.stringify(body), (err) => {
    if(err) console.log(err);
  });
  if(!!data.bot && !!data.callback){
      replyWithTemplates(data.bot,data.callback);
  }

}

function populateFileData(bot,callback){
    makeAPICall(APIUrl + '/templates',{bot, callback}, processTemplates);
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
}

// There should be a default help option for each script
var help = function(extraMessage){
  return (extraMessage != null) ? extraMessage : "MEME Genrator" + " USAGE: -meme [templateLink / template name] [Top Message; Lower Message]  \n To get the template links visit - http://memegen.link/templates/ or write -meme [template]";
}

// This runs any default functionality required by the script
var wakeUp = function(){
  try {
    fs.readFile('./scripts/memeConfig.json', (err, data) => {
      if (err) populateFileData(); //Populating data if no file is present
      else oLinkAlias = JSON.parse(data);
      });
  } catch (err) {
    // There is no file present
    populateFileData();
  }
}

module.exports = {
    reply, help, wakeUp
}

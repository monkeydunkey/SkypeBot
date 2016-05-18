/*
  hodor.js - this is the default functionality of the bot it say hodor multiple time :)
*/


var help = function () {
  return "Hodor Hodor Hodor!!";
}
var reply = function (data, bot, callback) {
  var sReturnMessage = "",
      iRandomValue = Math.floor((Math.random() * data.content.length) + 1),
      iCount = 0;
  for(iCount = 0; iCount < iRandomValue; iCount++){
      sReturnMessage += "Hodor ";
  }
  return sReturnMessage;
}
 var wakeUp = function() {
   return;
 }
module.exports = {
    reply, help
}

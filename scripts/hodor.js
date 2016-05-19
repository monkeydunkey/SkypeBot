/*
  hodor.js - this is the default functionality of the bot it say hodor multiple time :)
*/


var help = function () {
  return "Hodor Hodor Hodor!!";
}
var reply = function (message, bot, callback) {

  var sReturnMessage = "",
      iRandomValue = Math.floor((Math.random() * message.length) + 1),
      iCount = 0;
  for(iCount = 0; iCount < iRandomValue; iCount++){
      sReturnMessage += "Hodor ";
  }
  return sReturnMessage;
}
 var wakeUp = function() {
 }
module.exports = {
    reply, help, wakeUp
}

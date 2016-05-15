const fs = require('fs');
var oConfig = JSON.parse(fs.readFileSync('config.json', 'utf8')),
    oScriptLists = {};
for (var obj in oConfig.scripts) {
    oScriptLists[obj] = require(oConfig.scripts[obj]);
}
// This regex pattern is used to extract the command from the message
var commandRegexPatt = / -\S+/
var commandExtractor = function(command){
  return commandRegexPatt.exec(command);

}
var help = function(){
  var returnString = "Following are actions I can currently perform \n";
  for (var obj in oScriptLists) {
    returnString = obj.help();
  }
  return
}
module.exports = {oScriptLists, commandExtractor}

const fs = require('fs');
var oConfig = JSON.parse(fs.readFileSync('config.json', 'utf8')),
    oScriptLists = {};
for (var obj in oConfig.scripts) {
    oScriptLists[obj] = require(oConfig.scripts[obj]);
}

module.exports = {oScriptLists}

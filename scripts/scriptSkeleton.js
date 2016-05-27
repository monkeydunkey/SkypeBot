// This function is used to return the help messages
var help = function(){
  //To be implemented
}

// This function handles your reply to a specific command from user
/*
  Command - The text message received from the user
  bot - bot obejct that contains information regarding the bot, Pass this as the first parameter when replying to user using callback function
  callback - Use this function to reply to user if the reply can't be made immediately like an API call needs to be made or a file has to be read first

  callback needs to be called as follow - callback(bot, data)
  If your reply is an image or video data should be an object with the following properties
  {
    "name" : "name" // optional
   ,"type" : "Image or Video"
   ,"binaryContent" : "Image or video in binary format"
   ,"thumbnailContent" : "Thumbnail in binary format" // optional
  }
  Not able to send images as of now
*/
var reply = function(command, bot, callback){
  //To be implemented
}

//This function is called when the server first boots up
var wakeUp = function(){
  //To be implemented
}

// Export these functions so that they are globally accessible
module.exports = {
    reply, help, wakeUp
}

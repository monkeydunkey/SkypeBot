# Skypebot
Its an experimental skype bot that is based on the latest bot framework released by Microsoft.
To know about the framework visit - https://developer.microsoft.com/en-us/skype/bots

Follow the following steps to build your own bot - https://developer.microsoft.com/en-us/skype/bots/docs/tutorials/simple-nodejs

The bot is designed in a way that anyone can add there own functionalites.
To add functionality follow the steps below:
1) Add an entry in config.json with functionality name (this would also act as your command's keyword) and the location of the script file.
2) The script file for the functionality that you created must have the following functions exported
    a. reply(message, bot, callback) - This is the function via which a script will receive command
             message - it is the message typed by the user
             bot - This is the bot object that should be passed via the callback function
             callback - Function for sending message to the user. It should be of the format callback(bot, data). If data
                        to be sent is an image for video then data has to be an object of the following type.
                        {
                          name:"", //optional
                          type:"",// 'Image' or 'Video' only
                          binaryContent:""//Binary data of the content
                          thumbnailContent:""//optional, it also is should in binary format. Is used only for videos
                        }
    b. help() - This function must return the help text for your functionality
    c. wakeUp() - This function is called when the server boots up.                    

Currently the bot has the following functionalites:
 1) Hodor - replies hodor to anything
 2) Meme Generator - This return a link to image that is generated using the template and text provided
 3) Save User Data - This allows users to save and retrieve textual data

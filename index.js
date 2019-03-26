const fs = require("fs");
const dls = require("windows-drive-letters");
const vdf2 = require("simple-vdf2");
const config_paths = [
    ':/Program Files (x86)/Steam/config/loginusers.vdf',
    ':/Program Files/Steam/config/loginusers.vdf'
];
const user_info = [];


function getSteamId(callback){
    if(user_info.length==0){
        getUserInfo(function(uid){
            callback(returnSteamIds(uid));
        });
    }else{
        callback(returnSteamIds(user_info));
    }
    function returnSteamIds(arr){
        return arr.map(({ steamid }) => steamid);
    }
}

function getUsername(callback){
    if(user_info.length==0){
        getUserInfo(function(uid){
            callback(returnSteamIds(uid));
        });
    }else{
        callback(returnSteamIds(user_info));
    }
    function returnSteamIds(arr){
        return arr.map(({ username }) => username);
    }
}

function getUserInfo(callback){
    if(user_info.length==0){
        dls.usedLetters().then((letters) => {
            letters.forEach(function(letter){
                config_paths.forEach(function(path){
                    const config_file = letter+path;
                    fs.access(config_file, fs.F_OK, (err) => {
                        if (err) {
                        return
                        }
                        
                        //file exists
                        fs.readFile(config_file, "utf8", function(err, data) {
                            const users = vdf2.parse(data);
                            for(var property in users.users) {
                                if(users.users.hasOwnProperty(property)) {
                                    user_info.push({
                                        steamid:property,
                                        username:users.users[property].AccountName
                                    });
                                }
                            }
                            
                            callback(user_info);
                            return
                        });
                    })
                })
            })
        }).catch((err) => {
            console.error(err);
        });
    }else{
        callback(user_info);
    }
}

module.exports.getUserInfo = getUserInfo;
module.exports.getSteamId = getSteamId;
module.exports.getUsername = getUsername;

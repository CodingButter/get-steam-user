# get-steam-user

retrieves a list of steam users and their steam ids from the local machine. 
perfect for desktop apps looking to get information about a steam user.

# 💿 Installation

```sh
npm i get-steam-user
```
# 📖 Usage

### getUserInfo 
 [returns an array of users with usernames and steamids]

```sh
var gsu = require('get-steam-user');
gsu.getUserInfo(function(user_info){
   console.log(user_info); 
});
```
response 
```sh
[ { steamid: 'xxxxxxxxxxxx', username: 'usename' } ]
```
### getSteamId 
 [returns an array of users steamids]

```sh
var gsu = require('get-steam-user');
gsu.getSteamId(function(steamids){
   console.log(steamids); 
});
```
response 
```sh
[ 'xxxxxxxxxxxx' ] //xs being the steam id
```
### getUsername 
 [returns an array of usernames]

```sh
var gsu = require('get-steam-user');
gsu.getUsername(function(usernames){
   console.log(usernames); 
});
```
response 
```sh
[ 'a_username' ]
```
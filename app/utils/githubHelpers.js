var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID"
var param = "?client_id=" + id + "&client_secret=" + sec;

// axios will return a promise
function getUserInfo (username) {
	return axios.get('https://api.github.com/users/' + username + param)
}

// for each user in get players info - call getUsers info, will result in an arry of promises
// axios .get returns us promises
// axios.all - give it an array of promosies, when each are resolved - .then function runs and we will have the information

var helpers = {
	getPlayersInfo: function (players) {
		return axios.all(players.map(function (username) {
			return getUserInfo(username)
		})).then(function (info) {
			return info.map(function (user) {
				// we return a new array that just includes the data
				return user.data;
			})
		}).catch(function (err) {
			console.warn('Error in getPlayersInfo', err)
		})
	}
};



module.exports = helpers;
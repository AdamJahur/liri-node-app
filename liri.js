console.log("LIRI: What can I do for you?");
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var keys = require('./keys.js');
var twit = new Twitter(keys);
var argument = process.argv[2];
var value = process.argv[3];
var dataText = process.argv[4];

//Twitter Parameters
var params = {
	"screen_name": "AdamNJahur",
	"count": 20
}

//Twitter Logic
if(argument === "my-tweets"){
	twit.get('statueses/user_timeline', params, goData);
	function goData(error, data, response){
		var tweets = data;
		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].text);
			console.log(tweets[i].created_at);
		}
	};
	outputText();
}

//Omdb logic
if(argument === "movie-this"){
	console.log(process.argv);
	var movieTitle = process.argv[3];
	request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body){

		if(process.argv[3]){
			console.log(body);

		}else{
			request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true", function (error, response, body){
				console.log(body);
			})
		}
	})
	// outputText();
}



function outputText(){
	fs.appendFile('log.text', 'Argument: ' + argument + 'Movie or Song Title: ' + value + '. Movie or Song info: ' + dataText + '.');
}
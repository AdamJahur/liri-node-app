console.log("LIRI: What can I do for you?");
// var request = require('request');
var fs = require('fs');
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

//Spotify logic
if(argument === "spotify-this-song"){
	var songTitle = process.argv[3];
	spotify.search({ type: 'track', query: songTitle }, function(err, data){

		if(process.argv[3]){
			var data = data.tracks.items;
			for (var i = 0; i < data.length; i++) {

				console.log(data[i].name); //song track name
				console.log(data[i].album.href); //url
				console.log(data[i].album.name); //album name
				console.log(data[i].preview_url); //preview link to song
				
				for (var j = 0; i < data[i].artists.length; j++) {
					console.log(data[i].artists[j].name); //artisit's name
				}
			}
		}else{
			spotify.search({ type: 'track', query: "The Sign" }, function(err, data){
				var data = data.tracks.items;
				console.log(data[0].name); //song track name
				console.log(data[0].album.href); //url
				console.log(data[0].album.name); //album name
				console.log(data[0].preview_url); //preview link to song
				console.log(data[0].artists[0].name); //artisit's name
			});
		}
	});
	outputText();
}

//Read Text File Logic
if(argument === "do-what-it-says"){
	fs.readFile('random.txt', "utf8", function(err, data){
		console.log(data);
	});
	outputText();
}

function outputText(){
	fs.appendFile('log.text', 'Argument: ' + argument + 'Movie or Song Title: ' + value + '. Movie or Song info: ' + dataText + '.');
}
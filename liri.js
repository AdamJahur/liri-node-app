var dataKeys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var inputOne = process.argv[2];
var inputTwo = process.argv[3] || 'Mr.Nobody';
var inputThree = process.argv[4] || 'The-Sign, Ace of Base';


switch(process.argv[2]) {
	case 'movie-this':
	var queryUrl = "http://www.omdbapi.com/?t=" + inputTwo + "&y=&plot=short&tomatoes=true&r=json";
	request(queryUrl, function(error, data, body){

		body = JSON.parse(body)
		console.log("Title: " + body.Title);
		console.log("Release Year: " + body.Year);
		console.log("Country: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Actors: " + body.Actors);
		console.log("IMDB Rating " + body.imdbRating);
		console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
		console.log("Rotten Tomatoes URL: " + body.tomatoURL);

	});
	break;
	case 'my-tweets':
	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	var parameters = {screen_name: 'AdamNJahur'};

	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if(!error && response.statusCode == 200) {
			for(var i = 0; i < 3; i++){
				console.log(tweets[i].text + " Created on:" + tweets[i].created_at);
			}
		} else {
			console.log(error);
		}
	});
	break;
	case 'spotify-this-song':
	spotify();
	break;
	case 'do-what-it-says':
	fs.readFile('random.txt', 'utf8', function(error, data){
		if(error) {
			console.log(error);
		} else {
			var dataArr = data.split(",");
			console.log(dataArr);
		}
	});
	break;
	function spotify () {
		spotify.search({type: 'track', query: inputThree}, function(err, data) {
			if(err) {
				console.log('Unecpected Error' + err);
			}
			var songs = data.tracks.items;
			for(var i = 0; i < 1; i++) {
				console.log("Album:" + songs[i].album.name);
				console.log("Artist:" + songs[i].artists[0].name);
				console.log("Preview Link:" + songs[i].preview_url);
				console.log("Song:" + songs[i].name);
			}
		});
	}
}








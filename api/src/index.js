const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { host, port, db, authApiUrl } = require('./config');
const app = express();
const postSchema = new mongoose.Schema({
	name: String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
	app.listen(port, () => {
		console.log(`Started api service on port: ${port}`);
		console.log(`On host: ${host}`);
		console.log(`Our database: ${db}`);

		// Post.find(function (error, posts) {
		// 	if (error) return console.log(error);
		// 	console.log('posts', posts);
		// });

		const silence = new Post({name: 'Silence'});
		silence.save(function (error, savedSilence) {
			if (error) return console.log(error);
			console.log('savedSilence', savedSilence);
		});
	});
};

app.get('/test', (req, res) => {
	res.send('Our api sesrver is working correctly!')
});

app.get('/api/testapidata', (req, res) => {
	res.json({
		testwithapi: true
	});
});

app.get('/testwithcurrentuser', (req, res) => {
	console.log('authApiUrl', authApiUrl);
	axios.get(authApiUrl + '/surrentUser').then(response => {
		res.json({
			testwithcurrentuser: true,
			currentUserfromAuth: response.data
		});
	});
});

connectDb()
	.on('error', console.log(""))
	.on('disconnected', connectDb)
	.once('open', startServer);

const express = require('express');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { host, port, db, apiUrl } = require('./config');
const app = express();

const startServer = () => {
	app.listen(port, () => {
		console.log(`Started auth service on port: ${port}`);
		console.log(`On host: ${host}`);
		console.log(`Our database: ${db}`);
	});
};

app.get('/test', (req, res) => {
	res.send('Our auth sesrver is working correctly!')
});

app.get('testwithapidata', (req, res) => {
	axios.get(apiUrl + '/testapidata').then(response => {
		res.json({
			testapidata: response.data.testwithapidata
		});
	});
});

app.get('/api/currentUser', (req, res) => {
	res.json({
		id: '1',
		email: 'foo@gmail.com'
	});
});

connectDb()
	.on('error', console.log(""))
	.on('disconnected', connectDb)
	.once('open', startServer);

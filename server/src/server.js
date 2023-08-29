const express = require('express');
const router = require('./routes/index');
const morgan = require('morgan');
const cors = require('cors');

function getServer() {
	const server = express();

	server.use(morgan('dev'));
	server.use(express.json());
	server.use(cors());

	server.use(router);

	return server;
}

module.exports = getServer;

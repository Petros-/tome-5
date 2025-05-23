// this relates to getting the JWT_SECRET key
require('dotenv').config(); 

const express = require("express");
const routes = require("./routes");
const { router: authRouter } = require('./routes/auth');
const artworksRouter = require('./routes/artworks');

const server = express();

// required middleware
server.use(express.json());

// mount the router
server.use('/', authRouter);
server.use('/artworks', artworksRouter);
server.use(routes);

module.exports = server;

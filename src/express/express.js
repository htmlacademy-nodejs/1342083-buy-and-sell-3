'use strict';

const express = require(`express`);
const {ServerConfig} = require(`./constants`);

const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.listen(ServerConfig.DEFAULT_PORT);

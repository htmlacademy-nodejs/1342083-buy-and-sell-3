'use strict';

const path = require(`path`);
const express = require(`express`);
const {ServerConfig} = require(`./constants`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const app = express();

app.set(`views`, path.resolve(__dirname, ServerConfig.TEMPLATES));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, ServerConfig.PUBLIC_DIR)));

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.listen(ServerConfig.DEFAULT_PORT);

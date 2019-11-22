'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const timestamp = require('./routes/timestamp');
const peopleRoutes = require('./routes/people-routes.js');
const teamRoutes = require('./routes/teams-routes.js');
const error404 = require('./routes/404.js');
const error500 = require('./routes/500.js');

/**
 * Start Server 
 * @function start(port)
 * @param {number} port
 */

const start = port => {
  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });

  const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.MONGODB_URI, config);
};

// Models

// App Level MW
app.use(express.json());
app.use(timestamp);


// Routes
app.get('/', (req, res, next) => {
  console.log(req.query);
  res.send('People + Teams Mongo+Express app is Up & Running!');
});

app.use('/people', peopleRoutes);
app.use('/teams', teamsRoutes);

// Error Handling

app.use('*', error404); 
app.use('*', error500);


module.exports = {
  server: app,
  start: start
};

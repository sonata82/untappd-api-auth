const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const APP_URL = process.env.APP_URL;

app.get('/', function(req, res) {
  console.log(`GET / with ${req.query.code}`);
  request(`https://untappd.com/oauth/authorize/?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&response_type=code&redirect_url=${REDIRECT_URL}&code=${req.query.code}`, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
    console.log(`Received access token ${body.response.access_token}`)
    res.redirect(`${APP_URL}?access_token=${body.response.access_token}`)
  });
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}, configured with ${CLIENT_ID}, ${CLIENT_SECRET}, ${REDIRECT_URL} and ${APP_URL}`));
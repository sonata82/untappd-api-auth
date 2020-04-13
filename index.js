const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const APP_URL = process.env.APP_URL;

app.get('/', function(request, response) {
  console.log(`GET / with ${request.query.code}`);
  request(`https://untappd.com/oauth/authorize/?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&response_type=code&redirect_url=${REDIRECT_URL}&code=${request.query.code}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(`Received access token ${body.response.access_token}`)
    response.redirect(`${APP_URL}?access_token=${body.response.access_token}`)
  });
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}, configured with ${CLIENT_ID}, ${CLIENT_SECRET}, ${REDIRECT_URL} and ${APP_URL}`));
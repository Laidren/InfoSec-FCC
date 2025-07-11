const express = require('express');
const app = express();
const helmet = require('helmet')

const PORT = process.env.PORT || 3030;

days = 90*24*60*60

app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(
  helmet.frameguard({
    action: "DENY",
  })
);
app.use(helmet.xssFilter());
app.use(helmet.ieNoOpen());

app.use(helmet.hsts
  ({
    maxAge: days, force: true
})
);

app.use(helmet.dnsPrefetchControl())
app.use(helmet.noCache());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    }
  })
);


































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

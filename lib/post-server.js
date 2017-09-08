
/**
 * Boots a server that listens for data and passes it through
 */

const express = require('express');
const bodyParser = require('body-parser');
const ee = require('events');
const app = express();

//app.use(bodyParser());            // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

class postListener extends ee {
  constructor(opts = {}) {
    super();
    this.PORT = opts.port;
  }

  init() {
    app.post('/', (request, response) => { // Router
      response.status(200); response.send(); // msg recvd, reply to sender with a 200

      try {
        this.emit('data', JSON.parse(request.body.data));
      } catch (e) {
        request.on('data', (data) => {
          this.emit('data', JSON.parse(data));
        });
      }
    });

    app.listen(this.PORT, (err) => {
      if (err) return console.error('Something bad happened', err);
      console.log('server is listening on 127.0.0.1:' + this.PORT);
    });

  }
}

module.exports = postListener;
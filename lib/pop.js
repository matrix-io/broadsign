
/**
 * Start a server on port 5115 and process incoming log data.
 * - (TODO) : Handles authentication (API_KEY's)
 * - (TODO) : Organize stream by device
 * - (TODO) : Add support for verbose/non-verbose mode
 */

const PostServer = require('./post-server');
const Events = require('events');
const _ = require('lodash');

class Pop extends Events {
  constructor(opts) {

    super(); // Events constructor, needed
    this.postServer = new PostServer({ port: opts.port }); // default port 5115 for testing
    this.postServer.init(); // start server
    this.postServer.on('data', data => { // register listener and emit it

      /**
       * Clean up -> creates a new array of PoP info that contains less info
       * - (TODO) : add optional flag to pass raw data, or make raw data default
       */
      const notNeeded = ['impressions', 'interactions', 'ext1', 'ext2'];
      const cleanPop = _.map(data.pop, log => _.omit(log, notNeeded));
      const id = { player_id: data.player_id };

      const cleanData = _.assign({}, id, { pop: cleanPop });
      this.emit('data', cleanData);
      return;
    });
  }
}

module.exports = Pop;

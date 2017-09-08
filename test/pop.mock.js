
/**
 * Runs a mock PoP logging session
 * - 1 PoP log per request
 * - sends a request every 5 seconds
 * - iterates for 100 request
 */
const newman = require('newman');

const opts = {
  collection: require('./collections/broadsign.postman_collection.json'),
  reporters: 'cli',
  iterationCount : 10,
  delayRequest : 5000
}

function mock(){
  newman.run(opts, (err) => {
    if (err) {
      throw err;
    }
    console.log('collection run complete!');
  });
}

// this is a standalone app
if(!module.parent){
  console.log('Starting PoP mock...')
  mock();
}
// this is a dependency
else {
  module.exports = mock;
}

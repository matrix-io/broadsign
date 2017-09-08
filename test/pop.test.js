/**
 * Listens for a PoP log from a broadsign player and processes the data;
 */
const BSPop= require('../index.js').pop;

// starts a mock interaction from a single player
require('./pop.mock.js')();
require('colors')

let pop = new BSPop({port : 5116});

// start server
pop.on('data', (data) => {
  console.log("PoP recieved ! ".green);
  console.log('=> ${JSON.stringify(data, null, 2)}'.yellow);
});

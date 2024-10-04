
const EventEmitter = require('events');
const logEvents = require('./LogEvents');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('log', (message) => {
    logEvents(message);
});

setTimeout(() => {
    myEmitter.emit('log', 'New log event emitted');
}, 2000);

var events = require('events')
var eventEmitter =  new events.EventEmitter()

var connectHandler = ()=>{
    console.log('connection succesful')
    eventEmitter.emit('data_recieved')
}

eventEmitter.on('connection',connectHandler)

eventEmitter.on('data_recieved',()=>{
    console.log('data recieved succesfully')
})

eventEmitter.emit('connection')

console.log('Program ended')
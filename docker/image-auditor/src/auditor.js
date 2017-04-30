var dgram = require('dgram');
var net = require('net');
var moment = require('moment');
var s = dgram.createSocket('udp4');

var musicians = new Map();

s.on('message', function(msg, source){
	console.log("received" + msg);
	var musician = JSON.parse(msg);
	if(musicians.has(musician.uuid)){
		musicians.get(musician.uuid).lastUpdate = moment();
	}else{
			mus = new Object();
			mus.uuid = musician.uuid;
			mus.instrument = musician.instrument;
			mus.activeSince = moment();
			mus.lastUpdate = moment();
			musicians.set(mus.uuid, mus);
	}
});

s.on('listening', function(){
  console.log("listening...");
});

s.bind(2205, function(){
	s.addMembership("239.255.22.5");
});

var server = net.createServer(function(socket) {
	var arrayToSend = [];
	musicians.forEach( function(value, key, musicians){
		console.log("INSIDE FOREACH");
		if(value.lastUpdate.isAfter(moment().subtract(5, 'seconds'))){
			var mu = new Object();
			mu.uuid = key;
			mu.instrument = value.instrument;
			mu.activeSince = value.activeSince;
			arrayToSend.push(mu);
		}
	});
	socket.write(JSON.stringify(arrayToSend)+"\r\n");
	socket.end();
});

server.listen(2205);



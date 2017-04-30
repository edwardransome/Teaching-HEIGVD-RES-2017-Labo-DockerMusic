var dgram = require('dgram');
var net = require('net');
var moment = require('moment');
var s = dgram.createSocket('udp4');

var musicians = new Map();

s.bind(2205, function(){
	s.addMembership("239.255.22.5");
});

s.on('message', function(msg, source){
	var musician = JSON.parse(msg);
	if(musicians.has(musician.uuid)){
		musicians.get(musician.uuid).lastUpdate = moment.format();
	}else{
			mus = new Object;
			mus.uuid = musician.uuid;
			mus.instrument = musician.instrument;
			mus.activeSince = moment.format();
			mus.lastUpdate = moment.format();
	}
});

var server = net.createServer(function(socket) {
	var arrayToSend = [];
	musicians.forEach( function(value, key, musicians){
		if(value.lastUpdate > moment().subtract(5, 'seconds')){
			var mu = new Object;
			mu.uuid = key;
			mu.intrument = value.intrument;
			mu.activeSince = value.activeSince;
			arrayToSend.push(mu);
		}
	});
	socket.write(JSON.stringify(arrayToSend)+"\r\n");
	socket.end();
});
server.listen(2205);



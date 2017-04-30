var dgram = require('dgram');
const uuidV4 = require('uuid/v4');

var s = dgram.createSocket('udp4');

var musician = new Object();
musician.uuid = uuidV4();
musician.instrument = process.argv[2];
var sound;
	switch(process.argv[2]){
		case "piano":
			sound = "ti-ta-ti";
			break;
		case "trumpet":
			sound = "pouet";
			break;
		case "flute":
			sound = "trulu";
			break;
		case "violin":
			sound = "gzi-gzi";
			break;
		case "drum":
			sound = "boum-boum";
			break;
		default:
			sound = "unknown sound";
}

musician.sound = sound;
			
var payload = JSON.stringify(musician);

var loop = setInterval(function(){
	message = new Buffer(payload);
	s.send(message, 0, message.length, 2205, "239.255.22.5", function(err, bytes){});
}, 1000);
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.bootSerialport = function() {
  window.serialport = require('serialport');
}

window.bootFlash = function() {
  window.avrgirl = require('avrgirl-arduino'); 

  window.flash = function(port, cb) {
    let flasher = new window.avrgirl({ 
     		board: 'leonardo', 
      		port: port 
    	}); 
 
    	flasher.flash(__dirname+'/hex/adafruit_differential.hex', (err) =>{ 
      		if (err) { cb('danger', err) }  
      		else { 
        		cb('success');
      		} 
    	}); 
  }
}
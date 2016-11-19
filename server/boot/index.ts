import server 			from '../core/server';
import serialport		from '../core/serialport';
import sketch			from '../core/sketch';

import boot_server 		from './server';
import boot_api 		from '../api';
import boot_socket 		from './socket';
import boot_addon 		from '../addon';

export default function() {
	console.log('BOOT: start sequence');

	boot_server(server);
	boot_api(server);

	const http_server = server.listen( process.env.PORT || 3000, function () {
  		console.log('BOOT: server -> running on Port '+ (process.env.PORT || 3000) );
	})

	boot_socket(http_server);

	boot_addon();

	serialport.on('open', () => { sketch.getVersion() });
	
	console.log('BOOT: end sequence');
}

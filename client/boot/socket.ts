import boot_serialport		from '../state/serialport/api_socket';
import boot_sketch 			from '../state/sketch/api_socket';

export default function() {
	boot_serialport();
	boot_sketch();
}
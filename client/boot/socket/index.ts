import boot_serialport		from './serialport';
import boot_sketch			from './sketch';

export default function() {
	boot_serialport();
	boot_sketch();
}
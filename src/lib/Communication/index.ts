declare var window: any;

import Serial from './Serial';
import Socket from './Socket';

export default window.electron ? new Serial() : new Socket();
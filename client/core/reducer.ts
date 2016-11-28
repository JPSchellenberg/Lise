import { combineReducers }      from 'redux';

import controlPanel             from '../state/control-panel/reducer';
import LineChart                from '../modules/line-chart/reducer';
import reconstruction           from '../modules/reconstruction/reducer';
import page                     from '../state/page/reducer';
import notifications            from '../state/notifications/reducer';
import serialport               from '../state/serialport/reducer';
import os                       from '../state/os/reducer';
import sensors                  from '../state/sensors/reducer';

const rootReducer = combineReducers({
    controlPanel,
    LineChart,
    reconstruction,
    page,
    notifications,
    serialport,
    os,
    sensors
});

export default rootReducer;
import { combineReducers }      from 'redux';

import controlPanel             from '../state/control-panel/reducer';
import LineChart                from '../modules/line-chart/reducer';
import reconstruction           from '../modules/reconstruction/reducer';
import page                     from '../state/page/reducer';
import notifications            from '../state/notifications/reducer';
import serialport               from '../state/serialport/reducer';
import sketch                   from '../state/sketch/reducer';
import os                       from '../state/os/reducer';
import modal                    from '../state/modal/reducer';

const rootReducer = combineReducers({
    controlPanel: controlPanel,
    LineChart,
    reconstruction,
    page,
    notifications,
    serialport,
    sketch,
    os,
    modal
});

export default rootReducer;
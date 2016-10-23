import { combineReducers }  from 'redux';

import controlPanel         from '../state/control-panel/reducer';
import LineChart           from '../modules/line-chart/reducer';
import page                 from '../state/page/reducer';
import notifications        from '../state/notifications/reducer';
import ports              from '../state/ports/reducer';
import reconstruction       from '../modules/reconstruction/reducer';

const rootReducer = combineReducers({
    controlPanel: controlPanel,
    LineChart,
    page,
    notifications,
    ports,
    reconstruction
});

export default rootReducer;
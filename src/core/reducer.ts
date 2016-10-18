import { combineReducers }  from 'redux';

import controlPanel         from '../state/control-panel/reducer';
import LineChart           from '../modules/line-chart/reducer';
import page                 from '../state/page/reducer';
import notifications        from '../state/notifications/reducer';
import ports              from '../state/ports/reducer';

const rootReducer = combineReducers({
    controlPanel: controlPanel,
    LineChart,
    page,
    notifications,
    ports
});

export default rootReducer;
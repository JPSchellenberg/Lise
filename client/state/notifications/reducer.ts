import { assign } from 'lodash';

import {
	NOTIFICATIONS_SHOWNOTIFICATION,
	NOTIFICATIONS_HIDENOTIFICATION
} from '../action-types';

export default function(state = [], action) {
	switch (action.type) {

		case NOTIFICATIONS_SHOWNOTIFICATION:
			return [ ...state, action.notification ];

		case NOTIFICATIONS_HIDENOTIFICATION:
			return state.map(notification => notification.id === action.notificationId ? assign({},notification, { visible: false}) : notification);

		default:
			return state;
	}
}
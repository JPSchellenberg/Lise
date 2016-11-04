import {
	NOTIFICATIONS_SHOWNOTIFICATION,
	NOTIFICATIONS_HIDENOTIFICATION
} from '../action-types';

import Notification from './Notification';

export function showNotification(notification: Notification) {
	return {
		type: NOTIFICATIONS_SHOWNOTIFICATION,
		notification
	}
}

export function hideNotification(notificationId: string) {
	return {
		type: NOTIFICATIONS_HIDENOTIFICATION,
		notificationId
	}
}
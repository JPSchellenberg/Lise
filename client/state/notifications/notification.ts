import { uniqueId } from 'lodash';

export default class Notification {
	constructor(
		notification: any,
		type: string) 
		{
			this.notification = notification;
			this.type = type;
			this.id = uniqueId('_notification');
			this.visible = true;
		}

	public notification: any;
	public id: string;
	public type: string;
	public visible: boolean;
}
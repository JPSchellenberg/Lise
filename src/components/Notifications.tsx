///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';
import { connect } from 'react-redux';

import Notification from '../state/notifications/notification';

import { hideNotification } from '../state/notifications/actions';

interface INotificationsProps {	
  notifications?: Array<Notification>;
  hideNotification?: any;
}

interface INotificationsState {
}

export class Notifications extends React.Component<INotificationsProps, INotificationsState> {
	constructor(props: INotificationsProps) {
		super(props);
	}
	
	render() {
		return ( 
			<div className="container">
				<div className="row" style={{'marginTop': '60px'}}>

					{ this.props.notifications
						.filter(notification => notification.visible)
						.map(notification => 
						<div 
						key={notification.id}
						className={"alert alert-"+notification.type+" alert-dismissible"} role="alert">
							
							  {notification.notification}

							<button 
							onClick={() => this.props.hideNotification( notification.id )}

							type="button" 
							className="close" 
							data-dismiss="alert" 
							aria-label="Close"><span aria-hidden="true">&times;</span></button>
						</div>
						) }
					
				</div>
			</div>
			);
	}
};

function mapStateToProps(state): INotificationsProps {   
    return {        
        notifications: state.notifications
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  hideNotification: (notificationId) => dispatch( hideNotification( notificationId ) )
  };
}

export default connect<INotificationsProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
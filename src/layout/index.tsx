///<reference path='../../typings/index.d.ts'/>
import * as React from 'react';

import { connect } from 'react-redux'; 

import Navigation 			from '../components/Navigation';
import Version 		 		from '../components/Version';
import Notifications 		from '../components/Notifications';

import LineChart 			from '../modules/line-chart';

import ControlPanel 		from '../components/control-panel';
import PortSelect 			from '../components/PortSelect';

import { selectPort } from '../state/ports/actions';

import communication from '../lib/Communication';
import flash 		from '../lib/Flash';

import Reconstruction from '../modules/reconstruction';

declare var window: any; // remove and implement enviroment-module

interface IProps {	
	path?: string;
	ports?: string;
	selectedPort?: string;
	selectPort?: (comName: string) => void;
	connectionStatus?: string;
	connectionInfo?: any;
}

interface IState {
}

export class Layout extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.connectToPort = this.connectToPort.bind(this);
	}

	connectToPort(comName: string) {
		communication.connect(comName);
		this.props.selectPort(comName);
	}

	flash(port: string) {
		flash.flash(port);
	}
	
	render() {

		return (
			<div id="app">		
				
				<Navigation />
				<Notifications />

				<div className="container">
					<Reconstruction />

						{ route( this.props.path ) }
				</div>


				<footer className="footer">
					<div className="container">
						<div className="row">
							<div className="col-xs-4">
								<PortSelect 
								electron={window.electron}
								selectedPort={this.props.selectedPort} 
								selectPort={this.connectToPort}
								ports={this.props.ports}
								connectionStatus={this.props.connectionStatus}
								connectionInfo={this.props.connectionInfo}
								flash={this.flash}
								/>
							</div>
							<div className="col-xs-4">
								<ControlPanel />
							</div>
							<div className="col-xs-2 pull-right col-xs-offset-2">
								<Version version={process.env.VERSION} />
							</div>
						</div>
					</div>
				</footer>
			</div>
			);
	}
};

function route(path) {
	switch (path) {

		case '/settings':
		case '/webserver':
		case '/':
		case '/measurement':
		default:
			return (<LineChart />);
	}
}

function mapStateToProps(state): IProps {   
    return {        
		path: state.page.path,
		ports: state.ports.portList,
		selectedPort: state.ports.selectedPort,
		connectionStatus: state.ports.connectionStatus,
		connectionInfo: state.ports.connectionInfo
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  selectPort: (comName: string) => dispatch( selectPort(comName) )
  };
}

export default connect<IProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Layout);


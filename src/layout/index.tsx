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
import { showSettings } 	from '../modules/line-chart/actions';
import { showSettings as reconstruction_showSettings } from '../modules/reconstruction/actions';

interface IProps {	
	path?: string;
	ports?: string;
	selectedPort?: string;
	selectPort?: (comName: string) => void;
	connectionStatus?: string;
	connectionInfo?: any;
	lineChartSettings?: any;
	linechartToggleSettings?: any;
	linechartShowSettings?: any;
	linechartSettings?: any;

	reconstructionSettings?: any;
	reconstructionShowSettings?: any;
	reconstructionToggleSettings?: any;
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
					<Reconstruction 
						settings={this.props.reconstructionSettings}
						showSettings={this.props.reconstructionShowSettings}
						toggleSettings={this.props.reconstructionToggleSettings}
					/>
						<LineChart 
							settings={this.props.linechartSettings}
							showSettings={this.props.linechartShowSettings}
							toggleSettings={this.props.linechartToggleSettings}
				/>
				</div>

				<div className='row' style={{ marginBottom: '75px'}}></div>
				<footer className="footer">
					<div className="container">
						<div className="row">
							<div className="hidden-xs hidden-sm col-md-4">
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
							<div className="col-xs-12 col-md-4">
								<ControlPanel />
							</div>
							<div className="hidden-xs hidden-sm col-md-2 col-md-offset-2">
								<Version version={process.env.VERSION} />
							</div>
						</div>
					</div>
				</footer>
			</div>
			);
	}
};

function mapStateToProps(state): IProps {   
    return {        
		path: state.page.path,
		ports: state.ports.portList,
		selectedPort: state.ports.selectedPort,
		connectionStatus: state.ports.connectionStatus,
		connectionInfo: state.ports.connectionInfo,
		linechartShowSettings: state.LineChart.showSettings,
		linechartSettings: state.LineChart.settings,

		reconstructionSettings: state.reconstruction.settings,
		reconstructionShowSettings: state.reconstruction.showSettings
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  selectPort: (comName: string) => dispatch( selectPort(comName) ),
	  linechartToggleSettings: () => dispatch( showSettings() ),
	  reconstructionToggleSettings: () => dispatch( reconstruction_showSettings() )
  };
}

export default connect<IProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Layout);


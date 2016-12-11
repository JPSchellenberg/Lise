///<reference path='../../typings/index.d.ts'/>
import * as React from 'react';

import { connect } from 'react-redux'; 

import Navigation 			from '../components/Navigation';
import Version 		 		from '../components/Version';
import Notifications 		from '../components/Notifications';

import LineChart 			from '../modules/line-chart';
import Reconstruction 		from '../modules/reconstruction';
import ControlPanel 		from '../components/control-panel';
import PortSelect 			from '../components/PortSelect';
import Samplerate 			from '../components/Samplerate';
import Gain 				from '../components/Gain';

import ConnectionStatus from '../components/ConnectionStatus';
import SensorManager     from '../components/SensorManager';

import { showSettings } 	from '../modules/line-chart/actions';

import { showSettings as reconstruction_showSettings } from '../modules/reconstruction/actions';

import {
	get_connection
} from '../state/serialport/actions';

declare var window: any; // remove and implement enviroment-module

interface IProps {	
	path?: string;
	ports?: string;
	selectedPort?: string;
	connectPort?: (comName: string) => void;
	connectionStatus?: string;
	connectionInfo?: any;
	lineChartSettings?: any;
	linechartToggleSettings?: any;
	linechartShowSettings?: any;
	linechartSettings?: any;
	serialport?: any;
	sketch?: any;
	os?: any;
	modal?: any;
	get_serialport_list?: any;
	sketch_status?: string;
	input_list?: any;

	sketch_post_samplerate?: any;
	sketch_post_gain?: any;
	sketch_get_gain?: any;
	sketch_get_samplerate?: any;

	reconstructionSettings?: any;
	reconstructionShowSettings?: any;
	reconstructionToggleSettings?: any;
}

interface IState {
}

export class Layout extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}
	
	render() {

		return (
			<div id="app">		
				<Navigation/>
				<div className="container">
				<div className="row" style={{'marginTop': '60px'}}></div>

						<LineChart 
							settings={this.props.linechartSettings}

							showSettings={this.props.linechartShowSettings}

							toggleSettings={this.props.linechartToggleSettings}

							input_list={this.props.input_list}
						/>
						<Reconstruction 
							normalizationValue={1}
							settings={this.props.reconstructionSettings}
							showSettings={this.props.reconstructionShowSettings}
							toggleSettings={this.props.reconstructionToggleSettings}
						/>
				</div>

				<div className='row' style={{ marginBottom: '75px'}}></div>
					<div className="navbar navbar-inverse navbar-fixed-bottom">
						<div className="container-fluid">
						<div className="row">
							{/*<div className="hidden-xs hidden-sm col-md-4">
								<div className="dropup">
									<div className="btn-group">
								{
									(this.props.os.arch !== 'mips' && this.props.os.platform !== 'linux') 
									?
									<PortSelect />
									: 
									null
							}
								<ConnectionStatus />
								<SensorManager />
							</div>
							</div>
							</div>*/}
							<div className="hidden-xs hidden-sm col-md-4"></div>
							<div className="col-xs-12 col-md-4">
								{/*<div className="navbar-form">*/}
									<ControlPanel />
								{/*</div>*/}
							</div>
						</div>
					</div>
					</div>
			</div>
			);
	}
};

function mapStateToProps(state): IProps {   
    return {        
		path: state.page.path,
		// ports: state.serialport.list,
		// selectedPort: state.serialport.selectedPort,
		// connectionStatus: state.serialport.connectionStatus,
		// connectionInfo: state.serialport.connectionInfo,
		linechartShowSettings: state.LineChart.showSettings,
		linechartSettings: state.LineChart.settings,
		serialport: state.serialport,
		sketch: state.sketch,
		// sketch_status: state.sketch.status,
		os: state.os,
		modal: state.modal,
		input_list: state.inputs,

		reconstructionSettings: state.reconstruction.settings,
		reconstructionShowSettings: state.reconstruction.showSettings
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  linechartToggleSettings: () => dispatch( showSettings() ),

	  reconstructionToggleSettings: () => dispatch( reconstruction_showSettings() )
  };
}

export default connect<IProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Layout);


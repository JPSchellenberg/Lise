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

import { showSettings } 	from '../modules/line-chart/actions';

import {
	post_samplerate as sketch_post_samplerate,
	post_gain as sketch_post_gain,
	get_gain as sketch_get_gain,
	get_samplerate as sketch_get_samplerate
}							from '../state/sketch/actions';

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
				<Notifications />

				<div className="container">
				

						<LineChart 
							settings={this.props.linechartSettings}

							showSettings={this.props.linechartShowSettings}

							toggleSettings={this.props.linechartToggleSettings}
						/>
						<Reconstruction 
							normalizationValue={this.props.linechartSettings.YAxis.max/10}
							settings={this.props.reconstructionSettings}
							showSettings={this.props.reconstructionShowSettings}
							toggleSettings={this.props.reconstructionToggleSettings}
						/>
				</div>

				<div className='row' style={{ marginBottom: '75px'}}></div>
					<div className="navbar navbar-inverse navbar-fixed-bottom">
						<div className="container-fluid">
						<div className="row">
							<div className="hidden-xs hidden-sm col-md-4">
								{
									(this.props.os.arch !== 'mips' && this.props.os.platform !== 'linux') 
									?
									<PortSelect />
									: 
									null
							}
							</div>
							<div className="col-xs-10 col-md-4">
								<div className="navbar-form">
									<ControlPanel />
								</div>
							</div>
							<ul className="nav navbar-nav navbar-right">
								<li>
									<div className="navbar-form">
										{/*<Samplerate 
										get_samplerate={this.props.sketch_get_samplerate}
										sketch={this.props.sketch} 
										setSamplerate={this.props.sketch_post_samplerate}
										/>*/}
									</div>
								</li>
							<li>
								<div className="navbar-form">
									{/*<Gain
									get_gain={this.props.sketch_get_gain}
									setGain={this.props.sketch_post_gain}
									gain={this.props.sketch.gain}
									/>*/}
								</div>
							</li>
							</ul>
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
		// serialport: state.serialport,
		// sketch: state.sketch,
		// sketch_status: state.sketch.status,
		os: state.os,
		modal: state.modal,

		reconstructionSettings: state.reconstruction.settings,
		reconstructionShowSettings: state.reconstruction.showSettings
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  linechartToggleSettings: () => dispatch( showSettings() ),

	  sketch_post_samplerate: (samplerate: number) => dispatch( sketch_post_samplerate(samplerate) ),
	  sketch_post_gain: (gain: number) => dispatch( sketch_post_gain(gain) ),

	  sketch_get_gain: () => dispatch( sketch_get_gain() ),
	  sketch_get_samplerate: () => dispatch( sketch_get_samplerate() ),

	//   get_serialport_list: () => dispatch( get_list() ),

	  reconstructionToggleSettings: () => dispatch( reconstruction_showSettings() )
  };
}

export default connect<IProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Layout);


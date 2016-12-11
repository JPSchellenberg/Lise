import * as React from 'react';

import { assign } from 'lodash'; 
import { showSettings } from './actions';

import { DropdownButton, MenuItem, ButtonGroup } from 'react-bootstrap';

import Data from './Data';
import Settings from '../../components/settings';
import Chart from './Chart';

interface IProps {
	settings: any;
	showSettings: boolean;
	toggleSettings: () => void;
	input_list: any;
}

interface IState {
	settings: any;
}

declare var window: any;

export default class LineChart extends React.Component < IProps, IState > {
	constructor(props: IProps) {
		super(props);

		this.state = {
			settings: this.props.settings
		}

		this.changeValue = this.changeValue.bind(this);
	}

	changeValue(tab: string, settings: any) {
		const newSettings = {
			'settings': this.state.settings
		};
		newSettings.settings[tab] = settings;

		this.setState( assign({}, this.state, newSettings) );
	}


	render() {
		let sensors = [];
		for (let sensor_name in this.props.input_list) {
			sensors.push(<li className="dropdown-header">{sensor_name}</li>);
			for (let i = 0; i<this.props.input_list[sensor_name].length; i++) {
				sensors.push(
					<MenuItem 
					onClick={() => Data.addChannel(sensor_name,this.props.input_list[sensor_name][i], i)}
				eventKey="3">{this.props.input_list[sensor_name][i]}</MenuItem>
				)

			}
			sensors.push(<MenuItem divider />);
		}
		return ( 
		<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12">
			<div className = "panel panel-default" >
				<div className = "panel-heading" > 
					<div className="row">
						<div className="col-xs-10">
							Line Chart
						</div>
						{/*<div className="col-xs-2">
							<ButtonGroup>
								<DropdownButton bsStyle="default" title={"X"} key={0} id={0}>
									{sensors}
								</DropdownButton>
								<DropdownButton bsStyle="default" title={"Y"} key={1} id={1}>
									{sensors}
								</DropdownButton>
							</ButtonGroup>
						</div>*/}
					</div>
				</div> 
				<div className="panel-body" style={{height: "500px"}}>
					<Chart xaxis={this.state.settings.XAxis} yaxis={this.state.settings.YAxis} general={this.state.settings.General} />
				</div>
				<div className="panel-footer">
					<div className="row">
						<div className="col-md-1 col-md-offset-11">
							<div className="btn-group">
									<button 
									onClick={() => this.props.toggleSettings() }
									className="btn btn-default">
										{ false ? <i className="glyphicon glyphicon-picture"></i> : <i className="glyphicon glyphicon-cog"></i> }
									</button>
								</div>
						</div>
					</div>
				{ this.props.showSettings ?  <Settings settings=
					{ 
						this.state.settings
					}
					changeValue={this.changeValue}
						
						/>: null }
				 </div>
			</div>
			</div>
			</div>
		);
	}
};
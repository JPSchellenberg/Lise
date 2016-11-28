import * as React from 'react';

import { assign } from 'lodash'; 
import { showSettings } from './actions';

import Settings from '../../components/settings';
import Chart from './Chart';

interface IProps {
	settings: any;
	showSettings: boolean;
	toggleSettings: () => void;
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
		return ( 
		<div className="row">
									<div className="col-xs-12 col-sm-12 col-md-12">
			<div className = "panel panel-default" >
				<div className = "panel-heading" > 
					<div className="row">
						<div className="col-xs-11">
							Line Chart
						</div>
						<div className="col-xs-1">
							
						</div>
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
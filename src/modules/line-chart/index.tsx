import * as React from 'react';
import { showSettings } from './actions';

import Settings from './Settings';

interface IProps {
	settings: any;
	showSettings: boolean;
	toggleSettings: () => void;
}

interface IState {
	xaxis: any;
	yaxis: any;
}

declare var Flotr: any;
declare var window: any;

export default class LineChart extends React.Component < IProps, IState > {
	constructor(props: IProps) {
		super(props);

		this.state = {
			xaxis: this.props.settings.xaxis,
			yaxis: this.props.settings.yaxis
		}

		this.update = this.update.bind(this);
	}

	updatingInterval: any;

	componentDidMount() {
		this.updatingInterval = setInterval(this.update, 80);
		this.update();
	}

	componentWillUnmount() {
		clearInterval(this.updatingInterval);
	}

	componentDidUpdate() {
		this.update();
	}

	update() {
			Flotr.draw(
				document.getElementById('flotrGraph'), [
					{ data : window.channel1, label : 'Channel 1', color: '#000000'},
					{ data : window.channel2, label : 'Channel 2', color: '#FF0000'},
					]
					, {
					yaxis: this.state.yaxis,
					xaxis: this.state.xaxis
				});
	}



	render() {
		return ( 
		<div className="row" style={{'marginTop': '75px'}}>
									<div className="col-xs-10 col-xs-offset-1">
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
					<div id="flotrGraph" style={{height: "100%", width: "100%"}}></div>
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
				{ this.props.showSettings ?  <Settings xaxis={this.props.settings.xaxis} yaxis={this.props.settings.yaxis} />: null }
				 </div>
			</div>
			</div>
			</div>
		);
	}
};
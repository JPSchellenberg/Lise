import * as React from 'react';
import { connect } from 'react-redux';
import { showSettings } from './actions';

import Settings from './Settings';

interface IProps {
}

interface IState {
}

declare var Flotr: any;
declare var window: any;

class LineChart extends React.Component < IProps, IState > {
	constructor(props: IProps) {
		super(props);
		this.dataStore = new Array();

		this.update = this.update.bind(this);
	}

	dataStore: Array< Array<number> >;
	updatingInterval: any;

	componentDidMount() {
		var self = this;

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
			if (true) {
			Flotr.draw(
				document.getElementById('flotrGraph'), [
					{ data : window.channel1, label : 'Channel 1', color: '#000000'},
					{ data : window.channel2, label : 'Channel 2', color: '#FF0000'},
					]
					, {
					yaxis: {
						max: 2000,
						min: -2000,
						title: 'y'
					},
					xaxis: {
						showLabels: true,
							title: 'TIME'
					}
				});
			}
			
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
							<div className="btn-group">
								<button 
								onClick={() => console.log('IMPLEMENT: time-series show settings') }
								className="btn btn-default">
									{ false ? <i className="glyphicon glyphicon-picture"></i> : <i className="glyphicon glyphicon-cog"></i> }
								</button>
							</div>
						</div>
					</div>
				</div> 
				<div className="panel-body" style={{height: "500px"}}>
					{ false ? <Settings /> : <div id="flotrGraph" style={{height: "100%", width: "100%"}}></div> }
				</div>
			</div>
			</div>
			</div>
		);
	}
};

function mapStateToProps(state): IProps {   
    return {        
    };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect<IProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(LineChart);
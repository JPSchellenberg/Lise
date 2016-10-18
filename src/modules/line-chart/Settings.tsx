import * as React from 'react';
import { connect } from 'react-redux';
import { assign } from 'lodash';

// import store from '../../core/store';
import { save } from './actions';
import { TimeSeriesState as ComponentState } from './state';

declare var $: any;

interface IProps {	
	settings: any;
}

export class TimeSeriesSettings extends React.Component<IProps, ComponentState> {
	constructor(props: IProps) {
		super(props);

		this.state = props.settings;

		this.handleChange = this.handleChange.bind(this);
		this.loadInput = this.loadInput.bind(this);
	}
	componentDidMount() {
		 this.loadInput();
	}
	componentDidUpdate() {
	}

	handleChange(value, event) { 
		let newState = {}; 
		newState[value] = event.target.value;
		this.setState( assign(this.state, newState) ); 
	}

	loadInput() { 
	}
	
	render() {

		return (
			<div className="form-horizontal">
				<div className="form-group">
					<label htmlFor="inputEmail" className="control-label col-xs-2">Size</label>
					<div className="col-xs-5">
						<input 
						value={this.state.width}
						onChange={(e) => this.handleChange('width', e)}
						type="text" 
						className="form-control" 
						placeholder="width"></input>
					</div>
					<div className="col-xs-5">
						<input 
						value={this.state.height}
						onChange={(e) => this.handleChange('height', e)}
						type="text" 
						className="form-control" 
						placeholder="height"></input>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputEmail" className="control-label col-xs-2">xAxisTitle</label>
					<div className="col-xs-10">
						<input 
						value={this.state.xAxisTitle}
						onChange={(e) => this.handleChange('xAxisTitle', e) }
						type="text" 
						className="form-control"
						placeholder="xAxisTitle"></input>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputPassword" className="control-label col-xs-2">yAxisTitle</label>
					<div className="col-xs-10">
						<input 
						ref="test"
						value={this.state.yAxisTitle}
						onChange={(e) => this.handleChange('yAxisTitle', e) }
						type="text" 
						className="form-control" 
						placeholder="yAxisTitle"></input>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputPassword" className="control-label col-xs-2">yAxisMin</label>
					<div className="col-xs-10">
						<input 
						value={this.state.yAxisMin}
						onChange={(e) => this.handleChange('yAxisMin', e) }
						type="text" 
						className="form-control" 
						placeholder="-2"></input>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputPassword" className="control-label col-xs-2">yAxisMax</label>
					<div className="col-xs-10">
						<input 
						value={this.state.yAxisMax}
						onChange={(e) => this.handleChange('yAxisMax', e) }
						type="text" 
						className="form-control" 
						placeholder="2"></input>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputPassword" className="control-label col-xs-2">xAxis Input</label>
					<div className="col-xs-10">
						<select className="form-control">
							<option>Time</option>
							<option>Arduino Single - Channel 1</option>
							<option>Arduino Single - Channel 2</option>
							<option>Arduino Differential - 1 & 2</option>
						</select>
					</div>
				</div>			
				<div className="form-group">
					<div className="col-xs-offset-10 col-xs-2">
						<button
						onClick={() => console.log('IMPLEMENT: module line-chart')}
						className="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state): IProps {   
    return {        
		settings: state.timeSeries
    };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect<IProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(TimeSeriesSettings);
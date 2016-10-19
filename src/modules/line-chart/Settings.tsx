import * as React from 'react';
import { connect } from 'react-redux';
import { assign } from 'lodash';

// import store from '../../core/store';
import { save } from './actions';

import * as classnames from 'classnames';

interface IProps {	
	xaxis: any;
	yaxis: any;
}

interface IState {
	xaxis?: any;
	yaxis?: any;
	general?: any;
	tab?: string;
}

export default class LineChartSettings extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			xaxis: this.props.xaxis,
			yaxis: this.props.yaxis,
			general: {
				'Number of Datapoints': 100
			},
			tab: 'general'
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value: string, event) { 
		let newState = {}; 
		newState[value] = event.target.value;
		this.setState( assign(this.state, newState) ); 
	}

	render() {

		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<ul className="nav nav-tabs nav-justified">
							<li role="presentation" 
							onClick={() => this.setState({tab: 'general'})}
							className={classnames({
								'active': this.state.tab === 'general'
							})}><a>General</a></li>
							<li role="presentation" className="disabled"><a href="#">X Axis</a></li>
							<li role="presentation"
							onClick={() => this.setState({tab: 'yaxis'})}
							className={classnames({
								'active': this.state.tab === 'yaxis'
							})}
							><a>Y Axis</a></li>
							<li role="presentation" className="disabled"><a href="#">Grid</a></li>
						</ul>
					</div>
				</div>

				<Settings settings={this.state[this.state.tab]} />
			</div>
		);
	}
}

interface ITest {
	settings: any;
}

interface IState2 {

}

class Settings extends React.Component<ITest, IState2> {
	constructor(props: ITest) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value: string, event) { 
		// let newState = {}; 
		// newState[value] = event.target.value;
		// this.setState( assign(this.state, newState) ); 
	}

	render() {

		let settings = [];
		for (let key in this.props.settings) {
			settings.push(<div className="form-group">
							<label htmlFor="inputEmail" className="control-label col-xs-2">{key}</label>
							<div className="col-xs-10">
								<input 
								value={this.props.settings[key]}
								type="text" 
								className="form-control"
								></input>
							</div>
						</div>);
		}

								

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="form-horizontal">
						{settings}
					</div>
				</div>
			</div>
		);
	}
}

			/*<div className="form-horizontal">
				<div className="form-group">
					<label htmlFor="inputEmail" className="control-label col-xs-2">xAxisTitle</label>
					<div className="col-xs-10">
						<input 
						value={this.state.xaxis.title}
						onChange={(e) => this.handleChange('title', e) }
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
						value={this.state.yaxis.title}
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
						value={this.state.yaxis.min}
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
						value={this.state.yaxis.max}
						onChange={(e) => this.handleChange('yAxisMax', e) }
						type="text" 
						className="form-control" 
						placeholder="2"></input>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-offset-10 col-xs-2">
						<button
						onClick={() => console.log('IMPLEMENT: module line-chart')}
						className="btn btn-primary">Save</button>
					</div>
				</div>
			</div>*/
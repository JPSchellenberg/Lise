import * as React from 'react';

import Data from './Data';
declare var Flotr: any;

interface IProps {
	xaxis: any;
	yaxis: any;
	general: any;
}

interface IState {
}

declare var Flotr: any;
declare var window: any;

export default class LineChart extends React.Component < IProps, IState > {
	constructor(props: IProps) {
		super(props);

		this.update = this.update.bind(this);
	}

	updatingInterval: any;

	componentDidMount() {
		Data;
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
		if (this.props.xaxis && this.props.yaxis) {

			Flotr.draw(
				document.getElementById('flotrGraph'), 
					Data.getData()
					, {
					title: this.props.general.title,
					colors: ['#2980b9', '#27ae60', '#e74c3c', '#34495d', '#f39c11'],
					yaxis: this.props.yaxis,
					xaxis: this.props.xaxis
				});
		}
			
	}



	render() {
		return (
			<div id="flotrGraph" style={{height: "100%", width: "100%"}}></div>
			);
	}
};
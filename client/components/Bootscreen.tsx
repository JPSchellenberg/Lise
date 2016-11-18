///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';

interface IBootscreenProps {	
	version: string;
}

interface IBootscreenState {
	display: string;
}

export default class Bootscreen extends React.Component<IBootscreenProps, IBootscreenState> {
	constructor(props: IBootscreenProps) {
		super(props);

		this.state = {
			display: 'static'
		}
	}

	componentDidMount() {
		setTimeout(() => this.setState({display: 'none'}), 2500);
	}
	
	render() {
		return (
			<div className="boot-screen" style={{ display: this.state.display, zIndex: 9000, position:'fixed' }}>
			
				<div className="container">

					<div className="jumbotron">
						<h1>Lise</h1>
						<p> {this.props.version || 'No Version'} </p>
					</div>

					<div className="row">

						<div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3 ">

						</div>

					</div>

				</div>
			</div>
			);
	}
};
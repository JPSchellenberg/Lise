///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';

interface IBootscreenProps {	
	version: string;
	modules: Object;
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
		let modules = [];
		let numModules = 0;
		let successModules = 0;
		for (let moduleName in this.props.modules) {
			modules.push(<li key={moduleName} className={"list-group-item list-group-item-"+this.props.modules[moduleName]}> {moduleName} </li>)
			if(this.props.modules[moduleName] !== 'danger') { successModules++; }
			numModules++;
		}

		const percent = (successModules / numModules)*100 + "%"

		return (
			<div className="boot-screen" style={{ display: this.state.display, zIndex: 9000, position:'fixed' }}>
			
				<div className="container">

					<div className="jumbotron">
						<h1>Lise</h1>
						<p> {this.props.version || 'No Version'} </p>
					</div>

					<div className="row">

						<div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3 ">
						
							<div className="panel panel-default">
								<div className="panel-body">

									<h1>Booting ...</h1>

									<ul className="list-group">
										{ modules }
									</ul>

									<div className="progress">
  										<div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: percent }}>
    										{percent}
  										</div>
									</div>
								</div>
							</div>

						</div>

					</div>

				</div>
			</div>
			);
	}
};
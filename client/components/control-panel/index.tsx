import * as React from 'react';

declare var window: any;

import { 
	startRecording,
	stop
 } from '../../state/control-panel/actions';

import Data from '../../core/data';

interface IProps {	
}

interface IState {
}

export default class List extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}
	
	render() {
		return (
					<ul className="nav navbar-nav">
							<li
							className="btn btn-success"
							onClick={() => { 
								Data.startRecording();
							}}
							> 
								Start 
							</li>
							<li 
							className="btn btn-warning"
							onClick={() => { Data.stopRecording(); }}
							>
							Stop
							</li>
							<li
							className="btn btn-danger"
							onClick={() => {
								Data.reset();
							} }
							>
							 Reset 
							</li>
					</ul>
		);
	}
}
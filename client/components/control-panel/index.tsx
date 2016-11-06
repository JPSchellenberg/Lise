import * as React from 'react';

declare var window: any;

import { 
	startRecording,
	stop
 } from '../../state/control-panel/actions';

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
								window.recording = true; 
								window.channel1 = [];
								window.channel2 = [];
								window.lastTime = false;
							}}
							> 
								Start 
							</li>
							<li 
							className="btn btn-warning"
							onClick={() => { window.recording = false; }}
							>
							Stop
							</li>
							<li
							className="btn btn-danger"
							onClick={() => {
								window.channel1 = [];
								window.channel2 = [];
								window.lastTime = false;
							} }
							>
							 Reset 
							</li>
					</ul>
		);
	}
}
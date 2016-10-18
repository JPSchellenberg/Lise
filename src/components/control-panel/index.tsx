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
						<div className="btn-group">
							<button 
							className="btn btn-success"
							onClick={() => { window.recording = true; }}
							> 
								Start 
							</button>
							<button 
							className="btn btn-warning"
							onClick={() => { window.recording = false; }}
							>
							Stop
							</button>
							<button
							className="btn btn-danger"
							onClick={() => {
								window.channel1 = [];
								window.channel2 = [];
							} }
							>
							 Reset 
							</button>
						</div>
		);
	}
}
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
					<div className="col-xs-12">

							<div
							className="btn btn-success col-xs-4"
							onClick={() => { 
								Data.startRecording();
							}}
							> 
								Start 
							</div>
							<div 
							className="btn btn-warning col-xs-4"
							onClick={() => { Data.stopRecording(); }}
							>
							Stop
							</div>
							<div
							className="btn btn-danger col-xs-4"
							onClick={() => {
								Data.reset();
							} }
							>
							 Reset 
							</div>
					</div>
		);
	}
}
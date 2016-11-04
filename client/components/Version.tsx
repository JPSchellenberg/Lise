///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';

interface IVersionDisplayProps {	
  version: string;
}

interface IVersionDisplayState {
}

export default class VersionDisplay extends React.Component<IVersionDisplayProps, IVersionDisplayState> {
	constructor(props: IVersionDisplayProps) {
		super(props);
	}
	
	render() {
		return ( 
			<div 
			className="version"
			> 
				{this.props.version || "No Version"} 
			</div> 
			);
	}
};
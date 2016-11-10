///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';

import * as classnames from 'classnames';

declare var $: any;

interface IPortSelectProps {
	serialport: any;
  ports: any;
  connectionStatus: string;
  selectedPort: string;
  connectPort: (comName: string) => void;
  connectionInfo: any;
  sketch: any;
}

interface IPortSelectState {
}

export default class PortSelect extends React.Component<IPortSelectProps, IPortSelectState> {
	constructor(props: IPortSelectProps) {
		super(props);
	}
	
	render() {
		return ( 
				<div className="dropup">
				<div className="btn-group">
				<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<span>{
						this.props.serialport.connection
						?
						this.props.serialport.connection.path
						:
						'No Port selected'
					} <span className="caret"></span></span>
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
					{
						this.props.ports
						.filter(port => port.comName.indexOf('Bluetooth') === -1)
						.map(
							port => 
							<li 
							onClick={ () => { 
								this.props.connectPort(port.comName) } 
							}
							key={port.comName}><a>{port.comName}</a></li>
							)
					}
				</ul>
					<div 
						onClick={() => {}}
						className={classnames({
							'btn': true,
							'btn-success': (this.props.sketch.status === 'success'),
							'btn-warning': (this.props.sketch.status === 'pending'),
							'btn-danger': (this.props.sketch.status === "error")
						})}> 
						<i className="glyphicon glyphicon-flash"></i> 
					</div>
				</div>
			</div>
			);
	}
};
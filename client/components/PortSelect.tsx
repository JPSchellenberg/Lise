///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';

import * as classnames from 'classnames';

declare var $: any;

interface IPortSelectProps {
	serialport: any;
  electron: boolean;
  ports: any;
  connectionStatus: string;
  selectedPort: string;
  selectPort: (comName: string) => void;
  connectionInfo: any;
  flash: any;
}

interface IPortSelectState {
}

export default class PortSelect extends React.Component<IPortSelectProps, IPortSelectState> {
	constructor(props: IPortSelectProps) {
		super(props);

		this.tooltip = this.tooltip.bind(this);
	}

	tooltip() {
		switch(this.props.connectionStatus) {
			case 'warning':
				return 'connecting...';

			case 'success':
				return "sketch: "+this.props.connectionInfo.sketch+" - v"+this.props.connectionInfo.version;

			case 'danger':
				return 'No sketch found - click to flash';

			default:
				return '';
		}
	}
	
	render() {
		return ( 
				<div className="dropup">
				<div className="btn-group">
				<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{ this.props.electron ? <span>{this.props.selectedPort} <span className="caret"></span></span>  : 'Websockets' }
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
					{
						this.props.ports
						.filter(port => port.comName.indexOf('Bluetooth') === -1)
						.map(
							port => 
							<li 
							onClick={ () => { this.props.selectPort(port.comName) } }
							key={port.comName}><a>{port.comName}</a></li>
							)
					}
				</ul>
					<div 
						data-toggle="tooltip" data-placement="top" title={ this.tooltip() }
						onMouseEnter={ () => { 
							$('[data-toggle="tooltip"]').tooltip('destroy');
							$('[data-toggle="tooltip"]').tooltip();}
						}
						onClick={() => {
							// if (this.props.connectionStatus === 'danger') {
							// 	this.props.flash(this.props.selectedPort);
							// }
						}}
						className={"btn btn-"+this.props.connectionStatus}> 
						<i className="glyphicon glyphicon-flash"></i> 
					</div>
				</div>
			</div>
			);
	}
};
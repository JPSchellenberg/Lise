///<reference path='../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 

import * as classnames from 'classnames';

import ConnectionStatus from './ConnectionStatus';

import {
	get_portlist,
	post_connection
} from '../state/serialport/actions';

interface IPortSelectProps {
	portlist?: Array<any>;
	connection?: any;

	get_portlist?: () => void;
	post_connection?: (comName: string) => void;
}

interface IPortSelectState {
}

export class PortSelect extends React.Component<IPortSelectProps, IPortSelectState> {
	constructor(props: IPortSelectProps) {
		super(props);
	}
	
	render() {
		return ( 
				<div className="dropup">
				<div className="btn-group">
				<button 
				onClick={() => { this.props.get_portlist() }}
				className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<span>{
						this.props.connection
						?
						this.props.connection.path
						:
						'No Port selected'
					} <span className="caret"></span></span>
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
					{
						this.props.portlist.length === 0 
						?
						<li><a>No port found</a></li>
						:
						this.props.portlist
						.map(
							port => 
							<li 
							onClick={ () => { 
								this.props.post_connection(port.comName) } 
							}
							key={port.comName}><a>{port.comName}</a></li>
							)
					}
				</ul>
					<ConnectionStatus />
				</div>
			</div>
			);
	}
};

function mapStateToProps(state): IPortSelectProps {   
    return {    
		portlist: state.serialport.portlist,
		connection: state.serialport.connection
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  get_portlist: () => dispatch( get_portlist() ),
	  post_connection: (comName: string) => dispatch( post_connection({comName}) )
  };
}

export default connect<IPortSelectProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(PortSelect);
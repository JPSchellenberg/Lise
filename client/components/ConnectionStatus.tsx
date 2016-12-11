///<reference path='../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 
import * as classnames from 'classnames';

import { Modal, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import {
	post_flash_sketch
} from '../state/serialport/actions';

interface IConnectionStatusProps {
	sketch?: any;
	connection?: any;

	flash?: any;
}

interface IConnectionStatusState {
	showModal: boolean;
}

export class ConnectionStatus extends React.Component<IConnectionStatusProps, IConnectionStatusState> {
	constructor(props: IConnectionStatusProps) {
		super(props);

		this.state = {
			showModal: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.sketch === null) {
				this.setState({ showModal: true });
			} else {
				this.setState({ showModal: false });
			}
	}

	render() {
		return (
			<div 
						onClick={() => { if (this.props.sketch === null) { this.setState({ showModal: true }) }  }}
						className={classnames({
							'btn': true,
							'btn-success': (this.props.sketch !== null && this.props.connection !== null),
							'btn-warning': (this.props.sketch === null && this.props.connection !== null),
							'btn-danger': (this.props.connection === null)
						})}> 
						<i className="glyphicon glyphicon-flash"></i> 
						<Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
							<div>  
						<div className="modal-header">
        					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        					<h4 className="modal-title" id="myModalLabel">Kein kompatibler Sketch gefunden</h4>
  						</div>
      					<div className="modal-body">
							Es wurde kein kompatibler Sketch auf dem Arduino gefunden. Möchten Sie den momentanen Sketch überschreiben?
							Bitte wählen Sie dazu aus der folgenden Liste ihr Modell aus.

						</div>
 						<div className="modal-footer">
       				 		<button type="button" className="btn btn-danger" onClick={() => {this.setState({ showModal: false }) } }>Abbrechen</button>
        					<button
							onClick={() => { this.props.flash() }}
							type="button" className={classnames({
								"btn": true,
								"btn-success": true,
								"disabled": this.props.connection === null
							})}>Überschreiben</button>
      					</div>
					</div>
						</Modal>
					</div>
			);
	}
};

function mapStateToProps(state): IConnectionStatusProps {   
    return {    
		sketch: state.serialport.sketch,
		connection: state.serialport.connection
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  flash: () => dispatch( post_flash_sketch() )
  };
}

export default connect<IConnectionStatusProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionStatus);
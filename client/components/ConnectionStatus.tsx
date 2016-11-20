///<reference path='../../typings/index.d.ts'/>
import * as React from 'react';
import { connect } from 'react-redux'; 
import * as classnames from 'classnames';

import { Modal, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

import { post_flash } from '../state/sketch/actions';

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
		this.setState({ showModal: nextProps.sketch.showModal });
	}

	render() {
		return (
			<div 
						onClick={() => { this.setState({ showModal: true })  }}
						className={classnames({
							'btn': true,
							'btn-success': (this.props.sketch.status === 'success'),
							'btn-warning': (this.props.sketch.status === 'pending'),
							'btn-danger': (this.props.sketch.status === "error")
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
							<Panel header="Verfügbare Arduinos">
								<ListGroup>
									<ListGroupItem active>Leonardo</ListGroupItem>
								</ListGroup>
							</Panel>

						</div>
 						<div className="modal-footer">
       				 		<button type="button" className="btn btn-danger" onClick={() => {this.setState({ showModal: false }) } }>Abbrechen</button>
        					<button 
							onClick={() => { this.props.flash( this.props.connection.path , 'leonardo')}}
							type="button" className="btn btn-success">Überschreiben</button>
      					</div>
					</div>
						</Modal>
					</div>
			);
	}
};

function mapStateToProps(state): IConnectionStatusProps {   
    return {    
		sketch: state.sketch,
		connection: state.serialport.connection
    };
}

function mapDispatchToProps(dispatch) {
  return {
	  flash: (comName: string, board: string) => dispatch( post_flash(comName, board) )
  };
}

export default connect<IConnectionStatusProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(ConnectionStatus);
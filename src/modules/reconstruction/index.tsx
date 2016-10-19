import * as React from 'react';
import { connect } from 'react-redux';

import Graph from './Graph';

interface IProps {
}

interface IState {
}

export default class Reconstruction extends React.Component < IProps, IState > {
	constructor(props: IProps) {
		super(props);
  	}

	render() {
		return ( 
			<div className="panel panel-default" >
				<div className="panel-heading" > 
          <div className="row">
						<div className="col-xs-11">
					    Reconstruction
            </div>
            <div className="col-xs-1">
            </div>
          </div>
				</div> 
				<div className="panel-body" >
        <div className="row">
						<div className="col-xs-12">
							<Graph count={10} length={300} />
						</div>
					</div>
				</div>
			</div>
			
		);
	}
};
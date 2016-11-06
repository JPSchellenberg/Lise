import * as React from 'react';
import { assign } from 'lodash';

import Settings from '../../components/settings';

import Graph from './Graph';

interface IProps {
	settings: any;
	showSettings: boolean;
	toggleSettings: () => void;
}

interface IState {
	settings: any;
}

export default class Reconstruction extends React.Component < IProps, IState > {
	constructor(props: IProps) {
		super(props);

		this.state = {
			settings: this.props.settings
		}

		this.changeValue = this.changeValue.bind(this);
  	}

	changeValue(tab: string, settings: any) {
		const newSettings = {
			'settings': this.state.settings
		};
		newSettings.settings[tab] = settings;

		this.setState( assign({}, this.state, newSettings) );
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
							<Graph count={ this.state.settings.General.Zeitdifferenz} length={ this.state.settings.General['Anzahl der Messpunkte']} sphereRadius={this.state.settings.General.Kugelradius} />
						</div>
					</div>
				</div>
				<div className="panel-footer">
					<div className="row">
						<div className="col-md-1 col-md-offset-11">
							<div className="btn-group">
									<button 
									onClick={() => this.props.toggleSettings() }
									className="btn btn-default">
										{ false ? <i className="glyphicon glyphicon-picture"></i> : <i className="glyphicon glyphicon-cog"></i> }
									</button>
								</div>
						</div>
					</div>
				{ this.props.showSettings ?  <Settings settings=
					{ 
						this.state.settings
					}
					changeValue={this.changeValue}
						
						/>: null }
				 </div>
			</div>
			
		);
	}
};
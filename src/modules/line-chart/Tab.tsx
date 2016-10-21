import * as React from 'react';

import { assign }  from 'lodash';

interface IProps {	
	settings: any;
	changeSettings: (settings: any) => void;
}

interface IState {
}

export default class Tab extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(key: string, event) { 
		let newValue = {};
		try {
			newValue[key] = JSON.parse(event.target.value);
		} catch(err) {
			newValue[key] = event.target.value;
		}
		
		this.props.changeSettings( assign({}, this.props.settings, newValue));
	}

	render() {

		let settings = [];
		for (let key in this.props.settings) {
			// const type = this.props.settings[key].constructor.name ;
			settings.push(<div 
								key={key}
								className="form-group">
							<label htmlFor="inputEmail" className="control-label col-xs-2">{key}</label>
							<div className="col-xs-10">
								<input 
								onChange={ (e) => this.handleChange(key, e) }
								value={ this.props.settings[key] !== null ? this.props.settings[key] : ''}
								type="text"
								className="form-control"
								></input>
							</div>
						</div>);
		}

								

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="form-horizontal">
						{settings}
					</div>
				</div>
			</div>
		);
	}
}
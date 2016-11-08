///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';
import * as classnames from 'classnames';

interface ISamplerateProps {	
  sketch: any;
  setSamplerate: (samplerate: number) => void;
  get_samplerate: () => void;
}

interface ISamplerateState {
	samplerate: any;
}

export default class Samplerate extends React.Component<ISamplerateProps, ISamplerateState> {
	constructor(props: ISamplerateProps) {
		super(props);

		this.state = {
			samplerate: this.props.sketch.samplerate
		};

		this.handleChange = this.handleChange.bind(this);
		this.setSamplerate = this.setSamplerate.bind(this);
	}

	componentDidMount() {
		this.props.get_samplerate();
	}

	handleChange(event) {
		this.setState({ samplerate: parseInt( event.target.value )});		
	}

	setSamplerate() {
		if (this.state.samplerate) {
			this.props.setSamplerate( this.state.samplerate )
			this.setState({ samplerate: '' });
		}
	}
	
	render() {
		return ( 
			<div className={classnames({
				"form-group": true,
				"has-error": !this.state.samplerate
			})}>
				<div className="input-group">
					<input 
					onBlur={this.setSamplerate}
					onChange={this.handleChange}
					type="number" 
					className="form-control" 
					placeholder="Samplerate" 
					value={ this.state.samplerate || this.props.sketch.samplerate } 
					/>
				<span className="input-group-addon">1/s</span>
				</div>
			</div>
			);
	}
};
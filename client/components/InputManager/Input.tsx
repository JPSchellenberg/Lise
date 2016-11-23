///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';
import * as classnames from 'classnames';

interface IGainProps {	
  gain: number;
  setGain: (gain: number) => void;
  get_gain: () => void;
}

interface IGainState {
}

export default class Gain extends React.Component<IGainProps, IGainState> {
	constructor(props: IGainProps) {
		super(props);
	}

	componentDidMount() {
		this.props.get_gain();
	}
	
	render() {
		const gains = {
			0: "2/3x",
			1: "1x",
			2: "2x",
			4: "4x",
			8: "8x",
			16: "16x"
		};

		let _gains = [];
		for (let index in gains) {
			_gains.push(
				<li
				key={index}
				onClick={() => this.props.setGain( parseInt(index))}
			><a>{gains[index]}</a></li>)
		}

		return ( 
<div className="dropup">
				<div className="btn-group">
				<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{gains[this.props.gain]} Gain <span className="caret"></span>
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
					{ _gains }
				</ul>
				</div>
			</div>
			);
	}
};
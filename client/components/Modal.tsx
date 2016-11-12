///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';
import * as classnames from 'classnames';
import * as $ from 'jquery';

interface IModalProps {	
	show: boolean;
	content: any;
}

interface IModalState {
}

export default class Modal extends React.Component<IModalProps, IModalState> {
	constructor(props: IModalProps) {
		super(props);
	}

	componentDidMount() {}

	componentDidUpdate() {
		$('#myModal').modal({
			show: this.props.show
		});
	}
	
	render() {
		return (
			<div>
<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
    {this.props.content}
    </div>
  </div>
</div>
</div>
			);
	}
};
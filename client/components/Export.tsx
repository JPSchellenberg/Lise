import * as React from 'react';

declare var window: any;

interface IProps {	
}

interface IState {
}

export default class ExportMenu extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.save = this.save.bind(this);
	}

	save() {
		var data = window.channel1;
		var csvContent = "data:text/csv;charset=utf-8,";
		data.forEach(function(infoArray, index){
			var dataString = infoArray.join(",");
			csvContent += index < data.length ? dataString+ "\n" : dataString;
		}); 

		var encodedUri = encodeURI(csvContent);

		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", Date());
		document.body.appendChild(link); // Required for FF

		link.click();
	}
	
	render() {
		return (
				<li><a onClick={this.save}>Export (csv)</a></li>
		);
	}
}

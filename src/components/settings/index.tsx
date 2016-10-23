import * as React from 'react';
import { assign } from 'lodash';
import * as classnames from 'classnames';

import TabBar 		from './TabBar';
import Tab 			from './Tab';



interface IProps {	
	settings: any;
	changeValue: (tab: string, settings: any) => void;
}

interface IState {
	activeTab?: string;
}

export default class Settings extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			activeTab: Object.keys(this.props.settings)[0]
		};
	}

	render() {

		let tabNames = [];
		let settings;
		for (let tabName in this.props.settings) {
			tabNames.push(tabName);
			if (tabName === this.state.activeTab) { settings = this.props.settings[tabName] }
		}

		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<TabBar activeTab={this.state.activeTab} tabs={tabNames} selectTab={(tab) => this.setState({ activeTab: tab })} />
					</div>
					<Tab 
					settings={settings} 

					changeSettings={(settings) => { this.props.changeValue(this.state.activeTab, settings) } }
					/>
				</div>		
			</div>
		);
	}
}
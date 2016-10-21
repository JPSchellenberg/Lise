import * as React from 'react';

import * as classnames from 'classnames';

interface IProps {	
	tabs: Array<string>;
	activeTab: string;
	selectTab: (tab: string) => void;
}

interface IState {
}

export default class Tab extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
	}

	render() {					
		return (
				<ul className="nav nav-tabs nav-justified">
					{ 
						this.props.tabs.map(tab => 
							<li 
								key={tab}
								role="presentation" 
								className={classnames({
									'active': tab === this.props.activeTab
									})}
							>
								<a
									onClick={() => { this.props.selectTab(tab) }}
								>
									{tab}
								</a>
								</li>
						)
					}
				</ul>
		);
	}
}
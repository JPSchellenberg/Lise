///<reference path='../../typings/index.d.ts'/>

import * as React from 'react';

import Export   from './Export';

interface INavbarProps {	
}

interface INavbarState {
}

export default class Navbar extends React.Component<INavbarProps, INavbarState> {
	constructor(props: INavbarProps) {
		super(props);
	}
	
	render() {
		return (
			<nav className="navbar navbar-fixed-top navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand page-scroll">Lise</a>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <Export />
          </ul>
        </div>
      </div>
    </nav>
			);
	}
};
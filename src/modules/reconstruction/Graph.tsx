import * as React from 'react';

import { d3render, plotData }     from './d3render';

declare var d3: any;
declare var window: any;

let test = {
  scales: undefined,
  axisKeys: undefined,
  scene: undefined
};


interface IProps {
  count: number;
  length: number;
}

interface IState {
  scales?: any;
  axisKeys?: any;
  scene?: any;
  count?: number;
}

export default class ReconstructionGraph extends React.Component < IProps, IState > {
	constructor(props: IProps) {
		super(props);

    this.update = this.update.bind(this);
	}

  updatingInterval: any;

	componentDidMount() {
    this.update();
    this.updatingInterval = setInterval(this.update, 80);

          d3.select('#divPlot').style('width', "100%").style('height', "600px")
          test = d3render( d3.select('#divPlot') );
          // this.setState(data);
	}

  componentWillUnmount() {
		clearInterval(this.updatingInterval);
	}

  componentDidUpdate() {
    this.update();
  }

  update() {

      if (test.scales) {
        let rows = [];
			    if (window.channel1.length > 5*2) {
            for (let i=5*2; i < window.channel1.length; i++) {
              rows.push({x: window.channel1[i][1]/1000, y: window.channel1[i-5][1]/1000, z: window.channel1[i-(5*2)][1]/1000});
            }
            plotData(rows, test.scales, test.axisKeys, test.scene);
          } else {
            plotData([], test.scales, test.axisKeys, test.scene);
          }
      }
			    
  }



	render() {
		return ( 
			  <div id="divPlot"></div>
		);
	}
};

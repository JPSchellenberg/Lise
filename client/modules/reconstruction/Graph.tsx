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
  sphereRadius: number;
  color: string;
  normalizationValue: number;
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
			    if (window.channel1.length > this.props.count*2) {
            let length = window.channel1.length > this.props.length ? this.props.length : window.channel1.length;
            for (let i=this.props.count*2; i < length; i++) {
              rows.push({x: window.channel1[i][1]/this.props.normalizationValue, y: window.channel1[i-this.props.count][1]/this.props.normalizationValue, z: window.channel1[i-(this.props.count*2)][1]/this.props.normalizationValue});
            }
            plotData(rows, test.scales, test.axisKeys, test.scene, this.props.sphereRadius, this.props.color);
          } else {
            plotData([], test.scales, test.axisKeys, test.scene, this.props.sphereRadius, this.props.color);
          }
      }
			    
  }



	render() {
		return ( 
			  <div id="divPlot"></div>
		);
	}
};

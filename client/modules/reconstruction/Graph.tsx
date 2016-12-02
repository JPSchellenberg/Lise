import * as React from 'react';

import { d3render, plotData }     from './d3render';

import Data from './Data';

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
	}

  componentWillUnmount() {
		clearInterval(this.updatingInterval);
	}

  componentDidUpdate() {
    this.update();
  }

  update() {

    const data = Data.getData();
    const normalizationValue = 100;

      if (test.scales) {
        let rows = [];
			    if (data.length > this.props.count*2) {
            let length = data.length > this.props.length ? this.props.length : data.length;
            for (let i=this.props.count*2; i < length; i++) {
              rows.push({x: data[i]/normalizationValue, y: data[i-this.props.count]/normalizationValue, z: data[i-(this.props.count*2)]/normalizationValue});
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

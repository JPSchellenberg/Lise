/// <reference path="../../../../../typings/index.d.ts" />

import { expect } from 'chai';
import { assign } from 'lodash';

import { TimeSeriesState } from '../state';
import {
	TIMESERIES_SHOWSETTINGS,
	TIMESERIES_SAVE
} from '../../action-types';

import reducer from '../reducer';

describe('state -> time-series -> reducer', () => {
	it('toggles showSettings', (done) => {
		
		const initialState = new TimeSeriesState();

		const action = {
			type: TIMESERIES_SHOWSETTINGS
		};

		const nextState = reducer(initialState, action);

		expect( nextState ).to.be.deep.equal( assign(initialState, {showSettings: true}) );

		const nextState2 = reducer(initialState, action);

		expect( nextState2 ).to.be.deep.equal( assign(initialState, {showSettings: false}) );

		done();
	});

	it('saves a new state', (done) => {
		
		const initialState = new TimeSeriesState();
		const modifiedState = new TimeSeriesState();
		modifiedState.xAxisTitle = 'TEST';
		modifiedState.height = '300px';

		const action = {
			type: TIMESERIES_SAVE,
			state: modifiedState
		};

		const nextState = reducer(initialState, action);

		expect( nextState ).to.be.deep.equal( modifiedState );

		done();
	});
});
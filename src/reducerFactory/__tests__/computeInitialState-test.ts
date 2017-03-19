import initialState from '../initialState';

import computeInitialState from '../computeInitialState';

describe('Compute Initial Crud State', () => {
  it('throws an error if the function has invalid paramters', () => {
    expect(() => computeInitialState(<any>undefined))
      .toThrowError('Missing initialCrudState');
  });

  it('computes the initial crud state', () => {
    const computedState = computeInitialState(initialState);

    expect(computedState.get('value').toJS()).toEqual({});
  });

  it('upgrades the initial state', () => {
    const computedState = computeInitialState(initialState, {
      myMaster: 'yoda',
    });

    expect(computedState.get('value').toJS()).toEqual({});
    expect(computedState.get('myMaster')).toEqual('yoda');
  });
});




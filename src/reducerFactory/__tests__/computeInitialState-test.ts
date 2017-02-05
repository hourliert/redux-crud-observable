import computeInitialState from '../computeInitialState';

describe('Compute Initial Crud State', () => {
  it('computes the initial crud state', () => {
    const initialState = computeInitialState();

    expect(initialState.get('totalCount')).toEqual(0);
    expect(initialState.get('value').toJS()).toEqual({});
  });
});

it('computes the initial crud state and upgrade it', () => {
    const initialState = computeInitialState({
      myMaster: 'yoda',
    });

    expect(initialState.get('totalCount')).toEqual(0);
    expect(initialState.get('value').toJS()).toEqual({});
    expect(initialState.get('myMaster')).toEqual('yoda');
  });



import { fromJS } from 'immutable';

import { CrudState } from './interfaces';

export default function computeInitialState(initialState?: any): CrudState {
  const initialImmutableState = fromJS({
    bootTime: new Date(),
    totalCount: 0,
    value: {},
  })
    .merge(initialState);

  return initialImmutableState;
}

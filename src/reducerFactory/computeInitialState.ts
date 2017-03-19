import { fromJS } from 'immutable';

import { CrudState, InitialState } from './interfaces';

export default function computeInitialState(initialCrudState: InitialState, additionalState?: any): CrudState {
  if (!initialCrudState) throw new Error('Missing initialCrudState');

  const initialImmutableState = fromJS(initialCrudState)
    .merge(additionalState);

  return initialImmutableState;
}

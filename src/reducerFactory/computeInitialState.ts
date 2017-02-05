import { fromJS } from 'immutable';
import { InitialState } from 'config';

import { CrudState } from './interfaces';

export default function computeInitialState(initialCrudState: InitialState, additionalState?: any): CrudState {
  if (!initialCrudState) throw new Error('Missing initialCrudState');

  const initialImmutableState = fromJS(initialCrudState)
    .merge(additionalState);

  return initialImmutableState;
}

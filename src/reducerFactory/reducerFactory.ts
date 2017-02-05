import { Reducer } from 'redux';
import { reducerFactory } from 'redux-rac-utils';

import { CrudState } from './interfaces';

import computeInitialState from './computeInitialState';

export default function crudReducerFactory(
  ENTITY: string,
  initialState?: any,
): Reducer<CrudState> {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return reducerFactory<CrudState>(
    computeInitialState(initialState),
    {},
  );
}

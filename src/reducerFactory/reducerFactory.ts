import { Reducer, ReducersMapObject } from 'redux';
import { reducerFactory } from 'redux-rac-utils';
import { initialState } from 'config';

import { CrudState } from './interfaces';
import computeInitialState from './computeInitialState';
import storeHandlersFactory from './storeHandlersFactory';
import createHandlersFactory from './createHandlersFactory';
import readHandlersFactory from './readHandlersFactory';

export default function crudReducerFactory(
  ENTITY: string,
  upgradedState?: any,
  upgradedReducers?: ReducersMapObject,
): Reducer<CrudState> {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return reducerFactory<CrudState>(
    computeInitialState(
      initialState,
      upgradedState,
    ),
    {
      ...storeHandlersFactory(ENTITY),
      ...createHandlersFactory(ENTITY),
      ...readHandlersFactory(ENTITY),

      ...upgradedReducers,
    },
  );
}

import { Reducer, ReducersMapObject } from 'redux';
import { reducerFactory } from 'redux-rac-utils';

import { CrudState } from './interfaces';
import initialState from './initialState';
import computeInitialState from './computeInitialState';
import storeHandlersFactory from './storeHandlersFactory';
import createHandlersFactory from './createHandlersFactory';
import readHandlersFactory from './readHandlersFactory';
import updateHandlersFactory from './updateHandlersFactory';
import deleteHandlersFactory from './deleteHandlersFactory';

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
      ...updateHandlersFactory(ENTITY),
      ...deleteHandlersFactory(ENTITY),

      ...upgradedReducers,
    },
  );
}

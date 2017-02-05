import { Reducer, ReducersMapObject } from 'redux';
import { reducerFactory } from 'redux-rac-utils';
import { initialState } from 'config';
import { INIT_STORE } from 'constantFactory';

import {
  CrudState,
  InitStoreAction,
} from './interfaces';
import computeInitialState from './computeInitialState';

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
      [INIT_STORE(ENTITY)](state: CrudState, action: InitStoreAction) {
        return state.set('bootTime', action.payload.now);
      },

      ...upgradedReducers,
    },
  );
}

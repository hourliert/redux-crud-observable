import { ReducersMapObject } from 'redux';

import { INIT_STORE } from 'constantFactory';
import { InitStoreAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function storeHandlersFactory(ENTITY: string): ReducersMapObject {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return {
    [INIT_STORE(ENTITY)](state: CrudState, action: InitStoreAction): CrudState {
      return state.set('bootTime', action.payload.now);
    },
  };
}

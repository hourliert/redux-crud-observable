import { ReducersMapObject } from 'redux';

import { DELETE, DELETE_BATCH } from 'constantFactory';
import { IDeleteEntityAction, IDeleteEntitiesBatchAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function deleteHandlersFactory(ENTITY: string): ReducersMapObject {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return {
    [DELETE(ENTITY).FINISH](state: CrudState, action: IDeleteEntityAction): CrudState {
      return state
        .deleteIn(['value', action.payload]);
    },

    [DELETE_BATCH(ENTITY).FINISH](state: CrudState, action: IDeleteEntitiesBatchAction): CrudState {
      return state
        .update('value', value =>
          value.filterNot((_: any, k: string) => action.payload.indexOf(k) > -1),
        );
    },
  };
}

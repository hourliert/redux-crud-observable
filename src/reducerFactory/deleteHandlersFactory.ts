import { ReducersMapObject } from 'redux';

import { DELETE, DELETE_BATCH } from 'constantFactory';
import { IFinishDeleteEntityAction, IFinishDeleteEntitiesBatchAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function deleteHandlersFactory(ENTITY: string): ReducersMapObject {
  return {
    [DELETE(ENTITY).FINISH](state: CrudState, action: IFinishDeleteEntityAction): CrudState {
      if (!action.payload) return state;

      return state
        .deleteIn(['value', action.payload._internalHash]);
    },

    [DELETE_BATCH(ENTITY).FINISH](state: CrudState, action: IFinishDeleteEntitiesBatchAction): CrudState {
      if (!action.payload) return state;

      const entitiesIds = action.payload.map(e => e._internalHash);

      return state
        .update('value', value =>
          value.filterNot((_: any, k: string) => entitiesIds.indexOf(k) > -1),
        );
    },
  };
}

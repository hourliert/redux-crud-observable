import { ReducersMapObject } from 'redux';

import { READ, READ_BATCH, READ_LIST } from 'constantFactory';
import { formatEntity, formatEntities, formatEntitiesList } from 'crudEntity';
import { IFinishReadEntityAction, IFinishReadEntitiesBatchAction, IFinishReadEntitiesListAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function readHandlersFactory(ENTITY: string): ReducersMapObject {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return {
    [READ(ENTITY).FINISH](state: CrudState, action: IFinishReadEntityAction): CrudState {
      if (!action.payload) return state;

      return state
        .mergeIn(['value'], formatEntity(action.payload));
    },

    [READ_BATCH(ENTITY).FINISH](state: CrudState, action: IFinishReadEntitiesBatchAction): CrudState {
      if (!action.payload) return state;

      return state
        .mergeIn(['value'], formatEntities(action.payload));
    },

    [READ_LIST(ENTITY).FINISH](state: CrudState, action: IFinishReadEntitiesListAction): CrudState {
      if (!action.payload) return state;

      return state
        .mergeIn(['value'], formatEntitiesList(action.payload));
    },
  };
}

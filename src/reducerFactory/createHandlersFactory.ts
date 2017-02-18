import { ReducersMapObject } from 'redux';

import { CREATE } from 'constantFactory';
import { formatEntity } from 'crudEntity';
import { IFinishCreateEntityAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function createHandlersFactory(ENTITY: string): ReducersMapObject {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return {
    [CREATE(ENTITY).FINISH](state: CrudState, action: IFinishCreateEntityAction): CrudState {
      if (!action.payload) return state;

      return state
        .mergeIn(['value'], formatEntity(action.payload));
    },
  };
}

import { ReducersMapObject } from 'redux';

import { UPDATE } from 'constantFactory';
import { formatEntity } from 'crudEntity';
import { IFinishUpdateEntityAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function updateHandlersFactory(ENTITY: string): ReducersMapObject {
  return {
    [UPDATE(ENTITY).FINISH](state: CrudState, action: IFinishUpdateEntityAction): CrudState {
      if (!action.payload) return state;

      return state
        .mergeIn(['value'], formatEntity(action.payload));
    },
  };
}

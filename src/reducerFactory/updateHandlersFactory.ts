import { ReducersMapObject } from 'redux';

import { UPDATE } from 'constantFactory';
import { formatEntity } from 'crudEntity';
import { IUpdateEntityAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function updateHandlersFactory(ENTITY: string): ReducersMapObject {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return {
    [UPDATE(ENTITY).FINISH](state: CrudState, action: IUpdateEntityAction): CrudState {
      return state
        .mergeIn(['value'], formatEntity(action.payload));
    },
  };
}

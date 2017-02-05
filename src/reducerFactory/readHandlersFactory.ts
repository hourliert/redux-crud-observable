import { ReducersMapObject } from 'redux';

import { READ } from 'constantFactory';
import { formatEntity } from 'crudEntity';
import { ReadEntityAction } from 'actionsCreatorFactory';

import { CrudState } from './interfaces';

export default function readHandlersFactory(ENTITY: string): ReducersMapObject {
  if (!ENTITY) throw new Error('ENTITY is missing');

  return {
    [READ(ENTITY).FINISH](state: CrudState, action: ReadEntityAction): CrudState {
      return state
        .mergeIn(['value'], formatEntity(action.payload));
    },
  };
}

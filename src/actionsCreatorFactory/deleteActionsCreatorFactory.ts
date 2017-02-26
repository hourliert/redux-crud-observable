import { actionsCreatorFactory } from 'redux-rac-utils';
import { DELETE, DELETE_BATCH } from 'constantFactory';
import { IEntity } from 'crudEntity';

import {
  IRequestDeleteEntityPayload,
  IRequestDeleteEntitiesPayload,
  IDeleteActionsCreators,
} from './interfaces';

export default function deleteActionsCreatorFactory(ENTITY: string): IDeleteActionsCreators {
  return {
    cancelDeleteBatchEntities: actionsCreatorFactory<void, any>(DELETE_BATCH(ENTITY).CANCEL),
    cancelDeleteEntity: actionsCreatorFactory<void, any>(DELETE(ENTITY).CANCEL),

    failDeleteBatchEntities: actionsCreatorFactory<Error, any>(DELETE_BATCH(ENTITY).FAIL),
    failDeleteEntity: actionsCreatorFactory<Error, any>(DELETE(ENTITY).FAIL),

    finishDeleteBatchEntities: actionsCreatorFactory<Array<IEntity>, any>(DELETE_BATCH(ENTITY).FINISH),
    finishDeleteEntity: actionsCreatorFactory<IEntity, any>(DELETE(ENTITY).FINISH),

    requestDeleteBatchEntities: actionsCreatorFactory<IRequestDeleteEntitiesPayload, any>(DELETE_BATCH(ENTITY).REQUEST),
    requestDeleteEntity: actionsCreatorFactory<IRequestDeleteEntityPayload, any>(DELETE(ENTITY).REQUEST),
  };
}

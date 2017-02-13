import { actionsCreatorFactory } from 'redux-rac-utils';
import { DELETE, DELETE_BATCH } from 'constantFactory';

import { IDeleteEntityPayload, IDeleteEntitiesPayload, IDeleteActionsCreators } from './interfaces';

export default function deleteActionsCreatorFactory(ENTITY: string): IDeleteActionsCreators {
  return {
    cancelDeleteBatchEntities: actionsCreatorFactory<void, any>(DELETE_BATCH(ENTITY).CANCEL),
    cancelDeleteEntity: actionsCreatorFactory<void, any>(DELETE(ENTITY).CANCEL),

    failDeleteBatchEntities: actionsCreatorFactory<Error, any>(DELETE_BATCH(ENTITY).FAIL),
    failDeleteEntity: actionsCreatorFactory<Error, any>(DELETE(ENTITY).FAIL),

    finishDeleteBatchEntities: actionsCreatorFactory<IDeleteEntitiesPayload, any>(DELETE_BATCH(ENTITY).FINISH),
    finishDeleteEntity: actionsCreatorFactory<IDeleteEntityPayload, any>(DELETE(ENTITY).FINISH),

    requestDeleteBatchEntities: actionsCreatorFactory<IDeleteEntitiesPayload, any>(DELETE_BATCH(ENTITY).REQUEST),
    requestDeleteEntity: actionsCreatorFactory<IDeleteEntityPayload, any>(DELETE(ENTITY).REQUEST),
  };
}

import { actionsCreatorFactory } from 'redux-rac-utils';
import { READ, READ_BATCH, READ_LIST } from 'constantFactory';

import { IReadEntityPayload, IReadEntitiesPayload, IReadActionsCreators } from './interfaces';

export default function readActionsCreatorFactory(ENTITY: string): IReadActionsCreators {
  return {
    cancelReadBatchEntities: actionsCreatorFactory<void, any>(READ_BATCH(ENTITY).CANCEL),
    cancelReadEntitiesList: actionsCreatorFactory<void, any>(READ_LIST(ENTITY).CANCEL),
    cancelReadEntity: actionsCreatorFactory<void, any>(READ(ENTITY).CANCEL),

    failReadBatchEntities: actionsCreatorFactory<Error, any>(READ_BATCH(ENTITY).FAIL),
    failReadEntitiesList: actionsCreatorFactory<Error, any>(READ_LIST(ENTITY).FAIL),
    failReadEntity: actionsCreatorFactory<Error, any>(READ(ENTITY).FAIL),

    finishReadBatchEntities: actionsCreatorFactory<IReadEntitiesPayload, any>(READ_BATCH(ENTITY).FINISH),
    finishReadEntitiesList: actionsCreatorFactory<IReadEntitiesPayload, any>(READ_LIST(ENTITY).FINISH),
    finishReadEntity: actionsCreatorFactory<IReadEntityPayload, any>(READ(ENTITY).FINISH),

    requestReadBatchEntities: actionsCreatorFactory<IReadEntitiesPayload, any>(READ_BATCH(ENTITY).REQUEST),
    requestReadEntitiesList: actionsCreatorFactory<IReadEntitiesPayload, any>(READ_LIST(ENTITY).REQUEST),
    requestReadEntity: actionsCreatorFactory<IReadEntityPayload, any>(READ(ENTITY).REQUEST),
  };
}

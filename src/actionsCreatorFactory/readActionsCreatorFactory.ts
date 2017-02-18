import { actionsCreatorFactory } from 'redux-rac-utils';
import { READ, READ_BATCH, READ_LIST } from 'constantFactory';
import { IEntity, IEntitiesList } from 'crudEntity';

import {
  IRequestReadEntityPayload,
  IRequestReadEntitiesListPayload,
  IRequestReadEntitiesPayload,
  IReadActionsCreators,
} from './interfaces';

export default function readActionsCreatorFactory(ENTITY: string): IReadActionsCreators {
  return {
    cancelReadBatchEntities: actionsCreatorFactory<void, any>(READ_BATCH(ENTITY).CANCEL),
    cancelReadEntitiesList: actionsCreatorFactory<void, any>(READ_LIST(ENTITY).CANCEL),
    cancelReadEntity: actionsCreatorFactory<void, any>(READ(ENTITY).CANCEL),

    failReadBatchEntities: actionsCreatorFactory<Error, any>(READ_BATCH(ENTITY).FAIL),
    failReadEntitiesList: actionsCreatorFactory<Error, any>(READ_LIST(ENTITY).FAIL),
    failReadEntity: actionsCreatorFactory<Error, any>(READ(ENTITY).FAIL),

    finishReadBatchEntities: actionsCreatorFactory<Array<IEntity>, any>(READ_BATCH(ENTITY).FINISH),
    finishReadEntitiesList: actionsCreatorFactory<IEntitiesList, any>(READ_LIST(ENTITY).FINISH),
    finishReadEntity: actionsCreatorFactory<IEntity, any>(READ(ENTITY).FINISH),

    requestReadBatchEntities: actionsCreatorFactory<IRequestReadEntitiesPayload, any>(READ_BATCH(ENTITY).REQUEST),
    requestReadEntitiesList: actionsCreatorFactory<IRequestReadEntitiesListPayload, any>(READ_LIST(ENTITY).REQUEST),
    requestReadEntity: actionsCreatorFactory<IRequestReadEntityPayload, any>(READ(ENTITY).REQUEST),
  };
}

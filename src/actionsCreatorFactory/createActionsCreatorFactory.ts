import { actionsCreatorFactory } from 'redux-rac-utils';
import { CREATE } from 'constantFactory';
import { IEntity } from 'crudEntity';

import {
  IRequestCreateEntityPayload,
  ICreateActionsCreators,
} from './interfaces';

export default function createActionsCreatorsFactory(ENTITY: string): ICreateActionsCreators {
  return {
    cancelCreateEntity: actionsCreatorFactory<void, any>(CREATE(ENTITY).CANCEL),
    failCreateEntity: actionsCreatorFactory<Error, any>(CREATE(ENTITY).FAIL),
    finishCreateEntity: actionsCreatorFactory<IEntity, any>(CREATE(ENTITY).FINISH),
    requestCreateEntity: actionsCreatorFactory<IRequestCreateEntityPayload, any>(CREATE(ENTITY).REQUEST),
  };
}

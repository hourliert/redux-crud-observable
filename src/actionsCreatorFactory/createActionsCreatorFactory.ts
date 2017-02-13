import { actionsCreatorFactory } from 'redux-rac-utils';
import { CREATE } from 'constantFactory';

import { ICreateEntityPayload, ICreateActionsCreators } from './interfaces';

export default function createActionsCreatorsFactory(ENTITY: string): ICreateActionsCreators {
  return {
    cancelCreateEntity: actionsCreatorFactory<void, any>(CREATE(ENTITY).CANCEL),
    failCreateEntity: actionsCreatorFactory<Error, any>(CREATE(ENTITY).FAIL),
    finishCreateEntity: actionsCreatorFactory<ICreateEntityPayload, any>(CREATE(ENTITY).FINISH),
    requestCreateEntity: actionsCreatorFactory<ICreateEntityPayload, any>(CREATE(ENTITY).REQUEST),
  };
}

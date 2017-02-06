import { actionsCreatorFactory } from 'redux-rac-utils';
import { CREATE } from 'constantFactory';

import { ICreateActionsCreator } from './interfaces';

export default function createActionsCreatorsFactory(ENTITY: string): ICreateActionsCreator {
  return {
    cancelCreateEntity: actionsCreatorFactory(CREATE(ENTITY).CANCEL),
    failCreateEntity: actionsCreatorFactory(CREATE(ENTITY).FAIL),
    finishCreateEntity: actionsCreatorFactory(CREATE(ENTITY).FINISH),
    requestCreateEntity: actionsCreatorFactory(CREATE(ENTITY).REQUEST),
  };
}

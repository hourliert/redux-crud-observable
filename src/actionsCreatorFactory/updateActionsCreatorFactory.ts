import { actionsCreatorFactory } from 'redux-rac-utils';
import { UPDATE } from 'constantFactory';

import { IUpdateEntityPayload, IUpdateActionsCreators } from './interfaces';

export default function updateActionsCreatorsFactory(ENTITY: string): IUpdateActionsCreators {
  return {
    cancelUpdateEntity: actionsCreatorFactory<void, any>(UPDATE(ENTITY).CANCEL),
    failUpdateEntity: actionsCreatorFactory<Error, any>(UPDATE(ENTITY).FAIL),
    finishUpdateEntity: actionsCreatorFactory<IUpdateEntityPayload, any>(UPDATE(ENTITY).FINISH),
    requestUpdateEntity: actionsCreatorFactory<IUpdateEntityPayload, any>(UPDATE(ENTITY).REQUEST),
  };
}

import { actionsCreatorFactory } from 'redux-rac-utils';
import { UPDATE } from 'constantFactory';
import { IEntity } from 'crudEntity';

import {
  IRequestUpdateEntityPayload,
  IUpdateActionsCreators,
} from './interfaces';

export default function updateActionsCreatorsFactory(ENTITY: string): IUpdateActionsCreators {
  return {
    cancelUpdateEntity: actionsCreatorFactory<void, any>(UPDATE(ENTITY).CANCEL),
    failUpdateEntity: actionsCreatorFactory<Error, any>(UPDATE(ENTITY).FAIL),
    finishUpdateEntity: actionsCreatorFactory<IEntity, any>(UPDATE(ENTITY).FINISH),
    requestUpdateEntity: actionsCreatorFactory<IRequestUpdateEntityPayload, any>(UPDATE(ENTITY).REQUEST),
  };
}

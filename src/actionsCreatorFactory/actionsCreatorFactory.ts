import createActionsCreatorFactory from './createActionsCreatorFactory';
import readActionsCreatorFactory from './readActionsCreatorFactory';
import updateActionsCreatorFactory from './updateActionsCreatorFactory';
import deleteActionsCreatorFactory from './deleteActionsCreatorFactory';

import { ICrudActionsCreators } from './interfaces';

export default function crudActionsCreatorsFactory(ENTITY: string): ICrudActionsCreators {
  return {
    ...createActionsCreatorFactory(ENTITY),
    ...readActionsCreatorFactory(ENTITY),
    ...updateActionsCreatorFactory(ENTITY),
    ...deleteActionsCreatorFactory(ENTITY),
  };
}

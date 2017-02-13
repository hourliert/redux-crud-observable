import { ICreateActionsCreators } from './interfaces';
import createActionsCreatorFactory from './createActionsCreatorFactory';

export default function crudActionsCreatorsFactory(ENTITY: string): ICreateActionsCreators {
  return {
    ...createActionsCreatorFactory(ENTITY),
  };
}

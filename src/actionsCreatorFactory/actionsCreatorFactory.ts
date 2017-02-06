import { ICreateActionsCreator } from './interfaces';
import createActionsCreatorFactory from './createActionsCreatorFactory';

export default function crudActionsCreatorsFactory(ENTITY: string): ICreateActionsCreator {
  return {
    ...createActionsCreatorFactory(ENTITY),
  };
}

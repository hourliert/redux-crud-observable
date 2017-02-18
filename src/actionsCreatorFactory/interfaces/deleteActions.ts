import { IActionCreator, IAction } from 'redux-rac-utils';
import { IEntity } from 'crudEntity';

import {
  IRequestCrudActionPayload,
} from './crudActions';

export interface IFinishDeleteEntityAction extends IAction<IEntity, any> {}
export interface IFinishDeleteEntitiesBatchAction extends IAction<Array<IEntity>, any> {}

export interface IRequestDeleteEntityPayload extends IRequestCrudActionPayload {
  id: string|number;
}

export interface IRequestDeleteEntitiesPayload extends IRequestCrudActionPayload {
  ids: Array<string|number>;
}

export interface IDeleteActionsCreators {
  cancelDeleteEntity: IActionCreator<void, any>;
  failDeleteEntity: IActionCreator<Error, any>;
  finishDeleteEntity: IActionCreator<IEntity, any>;
  requestDeleteEntity: IActionCreator<IRequestDeleteEntityPayload, any>;

  cancelDeleteBatchEntities: IActionCreator<void, any>;
  failDeleteBatchEntities: IActionCreator<Error, any>;
  finishDeleteBatchEntities: IActionCreator<Array<IEntity>, any>;
  requestDeleteBatchEntities: IActionCreator<IRequestDeleteEntitiesPayload, any>;
}

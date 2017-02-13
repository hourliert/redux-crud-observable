import { IActionCreator } from 'redux-rac-utils';
import { Action } from 'redux';

export interface IDeleteEntityAction extends Action {
  payload: IDeleteEntityPayload;
}

export interface IDeleteEntitiesBatchAction extends Action {
  payload: IDeleteEntitiesPayload;
}

export type IDeleteEntityPayload = string;
export interface IDeleteEntitiesPayload extends Array<string> {}


export interface IDeleteActionsCreators {
  cancelDeleteEntity: IActionCreator<void, any>;
  failDeleteEntity: IActionCreator<Error, any>;
  finishDeleteEntity: IActionCreator<IDeleteEntityPayload, any>;
  requestDeleteEntity: IActionCreator<IDeleteEntityPayload, any>;

  cancelDeleteBatchEntities: IActionCreator<void, any>;
  failDeleteBatchEntities: IActionCreator<Error, any>;
  finishDeleteBatchEntities: IActionCreator<IDeleteEntitiesPayload, any>;
  requestDeleteBatchEntities: IActionCreator<IDeleteEntitiesPayload, any>;
}

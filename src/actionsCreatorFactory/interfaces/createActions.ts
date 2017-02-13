import { IActionCreator } from 'redux-rac-utils';
import { Action } from 'redux';
import { IEntity } from 'crudEntity';

export interface ICreateEntityAction extends Action {
  payload: ICreateEntityPayload;
}

export interface ICreateEntityPayload extends IEntity {}

export interface ICreateActionsCreators {
  cancelCreateEntity: IActionCreator<void, any>;
  failCreateEntity: IActionCreator<Error, any>;
  finishCreateEntity: IActionCreator<ICreateEntityPayload, any>;
  requestCreateEntity: IActionCreator<ICreateEntityPayload, any>;
}

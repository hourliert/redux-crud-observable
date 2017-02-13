import { IActionCreator } from 'redux-rac-utils';
import { Action } from 'redux';
import { IEntity } from 'crudEntity';

export interface IUpdateEntityAction extends Action {
  payload: IUpdateEntityPayload;
}

export interface IUpdateEntityPayload extends IEntity {}

export interface IUpdateActionsCreators {
  cancelUpdateEntity: IActionCreator<void, any>;
  failUpdateEntity: IActionCreator<Error, any>;
  finishUpdateEntity: IActionCreator<IUpdateEntityPayload, any>;
  requestUpdateEntity: IActionCreator<IUpdateEntityPayload, any>;
}

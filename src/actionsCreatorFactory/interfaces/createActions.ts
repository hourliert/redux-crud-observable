import { IActionCreator } from 'redux-rac-utils';
import { Action } from 'redux';
import { IEntity } from 'crudEntity';

export interface ICreateEntityAction extends Action {
  payload: IEntity;
}

export interface ICreateActionsCreator {
  cancelCreateEntity: IActionCreator<any, any>;
  failCreateEntity: IActionCreator<any, any>;
  finishCreateEntity: IActionCreator<any, any>;
  requestCreateEntity: IActionCreator<any, any>;
}

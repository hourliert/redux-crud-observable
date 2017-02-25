import { IActionCreator, IAction } from 'redux-rac-utils';
import { IEntity } from 'crudEntity';

import {
  IRequestCrudActionPayload,
} from './crudActions';

export interface IRequestCreateEntityAction extends IAction<IRequestCreateEntityPayload, any> {}

export interface IFinishCreateEntityAction extends IAction<IEntity, any> {}

export interface IRequestCreateEntityPayload extends IRequestCrudActionPayload {
  body: any;
}

export interface ICreateActionsCreators {
  cancelCreateEntity: IActionCreator<void, any>;
  failCreateEntity: IActionCreator<Error, any>;
  finishCreateEntity: IActionCreator<IEntity, any>;
  requestCreateEntity: IActionCreator<IRequestCreateEntityPayload, any>;
}

import { IActionCreator, IAction } from 'redux-rac-utils';
import { IEntity } from 'crudEntity';

import {
  IRequestCrudActionPayload,
} from './crudActions';

export interface IRequestUpdateEntityAction extends IAction<IRequestUpdateEntityPayload, any> {}

export interface IFinishUpdateEntityAction extends IAction<IEntity, any> {}

export interface IRequestUpdateEntityPayload extends IRequestCrudActionPayload {
  id: string|number;
  body: any;
}

export interface IUpdateActionsCreators {
  cancelUpdateEntity: IActionCreator<void, any>;
  failUpdateEntity: IActionCreator<Error, any>;
  finishUpdateEntity: IActionCreator<IEntity, any>;
  requestUpdateEntity: IActionCreator<IRequestUpdateEntityPayload, any>;
}

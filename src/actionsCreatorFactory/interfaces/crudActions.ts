import { IAction } from 'redux-rac-utils';
import { IApiConfig } from 'observableApiConnector';

import { ICreateActionsCreators } from './createActions';
import { IReadActionsCreators } from './readActions';
import { IUpdateActionsCreators } from './updateActions';
import { IDeleteActionsCreators } from './deleteActions';

export interface ICrudActionsCreators extends
  ICreateActionsCreators,
  IReadActionsCreators,
  IUpdateActionsCreators,
  IDeleteActionsCreators {}

export interface IRequestCrudAction extends IAction<IRequestCrudActionPayload, any> {}

export interface IRequestCrudActionPayload {
  queryParams?: Object;
  api?: IApiConfig;
}

export interface IFinishCrudAction extends IAction<any, any> {}

export interface IFailCrudAction extends IAction<Error, any> {}

export interface ICancelCrudAction extends IAction<void, any> {}

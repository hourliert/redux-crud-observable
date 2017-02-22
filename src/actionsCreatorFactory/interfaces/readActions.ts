import { IActionCreator, IAction } from 'redux-rac-utils';
import { IEntity, IEntitiesList } from 'crudEntity';

import {
  IRequestCrudActionPayload,
} from './crudActions';

export interface IRequestReadEntityAction extends IAction<IRequestReadEntityPayload, any> {}
export interface IRequestReadEntitiesAction extends IAction<IRequestReadEntitiesPayload, any> {}
export interface IRequestReadEntitiesListAction extends IAction<IRequestReadEntitiesListPayload, any> {}

export interface IFinishReadEntityAction extends IAction<IEntity, any> {}
export interface IFinishReadEntitiesBatchAction extends IAction<Array<IEntity>, any> {}
export interface IFinishReadEntitiesListAction extends IAction<IEntitiesList, any> {}

export interface IRequestReadEntityPayload extends IRequestCrudActionPayload {
  id: string|number;
}

export interface IRequestReadEntitiesPayload extends IRequestCrudActionPayload {
  ids: Array<string|number>;
}

export interface IRequestReadEntitiesListPayload extends IRequestCrudActionPayload {}


export interface IReadActionsCreators {
  cancelReadEntity: IActionCreator<void, any>;
  failReadEntity: IActionCreator<Error, any>;
  finishReadEntity: IActionCreator<IEntity, any>;
  requestReadEntity: IActionCreator<IRequestReadEntityPayload, any>;

  cancelReadEntitiesList: IActionCreator<void, any>;
  failReadEntitiesList: IActionCreator<Error, any>;
  finishReadEntitiesList: IActionCreator<IEntitiesList, any>;
  requestReadEntitiesList: IActionCreator<IRequestReadEntitiesListPayload, any>;

  cancelReadBatchEntities: IActionCreator<void, any>;
  failReadBatchEntities: IActionCreator<Error, any>;
  finishReadBatchEntities: IActionCreator<Array<IEntity>, any>;
  requestReadBatchEntities: IActionCreator<IRequestReadEntitiesPayload, any>;
}

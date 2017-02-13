import { IActionCreator } from 'redux-rac-utils';
import { Action } from 'redux';
import { IEntity } from 'crudEntity';

export interface IReadEntityAction extends Action {
  payload: IEntity;
}

export interface IReadEntitiesBatchAction extends Action {
  payload: IEntity[];
}

export interface IReadEntitiesListAction extends Action {
  payload: IEntity[];
}

export interface IReadEntityPayload extends IEntity {}
export interface IReadEntitiesPayload extends Array<IEntity> {}


export interface IReadActionsCreators {
  cancelReadEntity: IActionCreator<void, any>;
  failReadEntity: IActionCreator<Error, any>;
  finishReadEntity: IActionCreator<IReadEntityPayload, any>;
  requestReadEntity: IActionCreator<IReadEntityPayload, any>;

  cancelReadEntitiesList: IActionCreator<void, any>;
  failReadEntitiesList: IActionCreator<Error, any>;
  finishReadEntitiesList: IActionCreator<IReadEntitiesPayload, any>;
  requestReadEntitiesList: IActionCreator<IReadEntitiesPayload, any>;

  cancelReadBatchEntities: IActionCreator<void, any>;
  failReadBatchEntities: IActionCreator<Error, any>;
  finishReadBatchEntities: IActionCreator<IReadEntitiesPayload, any>;
  requestReadBatchEntities: IActionCreator<IReadEntitiesPayload, any>;
}

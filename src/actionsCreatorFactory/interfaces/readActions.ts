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

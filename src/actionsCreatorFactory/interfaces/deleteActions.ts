import { Action } from 'redux';

export interface IDeleteEntityAction extends Action {
  payload: string;
}

export interface IDeleteEntitiesBatchAction extends Action {
  payload: string[];
}

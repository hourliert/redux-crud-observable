import { Action } from 'redux';
import { IEntity } from 'crudEntity';

export interface IReadEntityAction extends Action {
  payload: IEntity;
}

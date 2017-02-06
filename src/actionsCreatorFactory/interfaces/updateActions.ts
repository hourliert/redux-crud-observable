import { Action } from 'redux';
import { IEntity } from 'crudEntity';

export interface IUpdateEntityAction extends Action {
  payload: IEntity;
}

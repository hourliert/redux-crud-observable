import { Action } from 'redux';
import { IEntity } from 'crudEntity';

export interface ICreateEntityAction extends Action {
  payload: IEntity;
}

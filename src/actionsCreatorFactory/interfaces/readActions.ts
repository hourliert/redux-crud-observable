import { Action } from 'redux';
import { Entity } from 'crudEntity';

export interface ReadEntityAction extends Action {
  payload: Entity;
}

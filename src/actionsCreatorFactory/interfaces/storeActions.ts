import { Action } from 'redux';

export interface IInitStoreAction extends Action {
  payload: { now: Date };
}

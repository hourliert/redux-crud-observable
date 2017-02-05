import { Action } from 'redux';

export interface InitStoreAction extends Action {
  payload: { now: Date };
}

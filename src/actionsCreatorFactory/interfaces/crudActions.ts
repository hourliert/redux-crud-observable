import { ICreateActionsCreators } from './createActions';
import { IReadActionsCreators } from './readActions';
import { IUpdateActionsCreators } from './updateActions';
import { IDeleteActionsCreators } from './deleteActions';


export interface ICrudActionsCreators extends
  ICreateActionsCreators,
  IReadActionsCreators,
  IUpdateActionsCreators,
  IDeleteActionsCreators {}

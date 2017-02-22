import { combineEpics, Epic } from 'redux-observable';

import readEpicFactory from './readEpicFactory';
import { IEpicParams } from './interfaces';

export default function crudEpicFactory(params: IEpicParams): Epic<any, any> {
  return combineEpics(
    readEpicFactory(params),
  );
}

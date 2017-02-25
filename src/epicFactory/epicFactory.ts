import { combineEpics, Epic } from 'redux-observable';

import readEpicFactory from './readEpicFactory';
import createEpicFactory from './createEpicFactory';
import { IEpicParams } from './interfaces';

export default function crudEpicFactory(params: IEpicParams): Epic<any, any> {
  return combineEpics(
    createEpicFactory(params),
    readEpicFactory(params),
  );
}

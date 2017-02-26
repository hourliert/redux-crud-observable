import { combineEpics, Epic } from 'redux-observable';

import createEpicFactory from './createEpicFactory';
import readEpicFactory from './readEpicFactory';
import updateEpicFactory from './updateEpicFactory';
import deleteEpicFactory from './deleteEpicFactory';

import { IEpicParams } from './interfaces';

export default function crudEpicFactory(params: IEpicParams): Epic<any, any> {
  return combineEpics(
    createEpicFactory(params),
    readEpicFactory(params),
    updateEpicFactory(params),
    deleteEpicFactory(params),
  );
}

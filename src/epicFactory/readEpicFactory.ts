import { Observable } from 'rxjs';
import { ActionsObservable, Epic } from 'redux-observable';

import { fetchEntity } from 'observableApiConnector';
import { readCrudActionsCreatorFactory } from 'actionsCreatorFactory';
import {
  READ,
} from 'constantFactory';

import { IFetchEntityEpicParams } from './interfaces';

export default function fetchEpicFactory({
  entity,
  apiConfig,
}: IFetchEntityEpicParams): Array<Epic<any, any>> {
  const {
    finishReadEntity,
    failReadEntity,
  } = readCrudActionsCreatorFactory(entity);

  const fetchEntityEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(READ(entity).REQUEST)
      .switchMap(({ meta, payload: { api, id, queryParams }}) => (
        fetchEntity({
          id,
          queryParams,
          config: Object.assign({}, apiConfig, api),
        })
          .map(res => finishReadEntity(res, meta))
          .takeUntil(action$.ofType(READ(entity).CANCEL))
          .catch(error => Observable.of(failReadEntity(error, meta)))
      ))
  );

  return [
    fetchEntityEpic,
  ];
}

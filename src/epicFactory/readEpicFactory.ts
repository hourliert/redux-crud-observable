import { Observable } from 'rxjs';
import { ActionsObservable, Epic, combineEpics } from 'redux-observable';

import {
  readEntity,
  IApiConfig,
} from 'observableApiConnector';
import { IEntity } from 'crudEntity';
import {
  readCrudActionsCreatorFactory,
  IRequestReadEntityAction,
  IRequestReadEntitiesAction,
  IRequestReadEntitiesListAction,
} from 'actionsCreatorFactory';
import {
  READ,
  READ_LIST,
  READ_BATCH,
} from 'constantFactory';

import { IEpicParams } from './interfaces';

export default function readEpicFactory({
  entity,
  apiConfig,
}: IEpicParams): Epic<any, any> {
  const {
    finishReadEntity,
    failReadEntity,

    finishReadEntitiesList,
    failReadEntitiesList,

    finishReadBatchEntities,
    failReadBatchEntities,
  } = readCrudActionsCreatorFactory(entity);

  const fetchEntityEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(READ(entity).REQUEST)
      .switchMap(({ meta, payload }: IRequestReadEntityAction) => {
        if (!payload) return Observable.empty();

        const config = payload.api ?
          Object.assign<Object, IApiConfig, IApiConfig>({}, apiConfig, payload.api) :
          apiConfig;

        return readEntity({
          config: config,
          id: payload.id,
          queryParams: payload.queryParams,
        })
          .map((res: IEntity) => finishReadEntity(res, meta))
          .takeUntil(action$.ofType(READ(entity).CANCEL))
          .catch((error: Error) => Observable.of(failReadEntity(error, meta)));
      })
  );

  const fetchEntitiesListEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(READ_LIST(entity).REQUEST)
      .switchMap(({ meta, payload }: IRequestReadEntitiesListAction) => {
        const config = payload && payload.api ?
          Object.assign<Object, IApiConfig, IApiConfig>({}, apiConfig, payload.api) :
          apiConfig;

        return readEntity({
          config: config,
          queryParams: payload && payload.queryParams,
        })
          .map((res: IEntity) => finishReadEntitiesList(res, meta))
          .takeUntil(action$.ofType(READ_LIST(entity).CANCEL))
          .catch((error: Error) => Observable.of(failReadEntitiesList(error, meta)));
      })
  );

  const fetchBatchEntitiesEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(READ_BATCH(entity).REQUEST)
      .switchMap(({ meta, payload }: IRequestReadEntitiesAction) => {
        if (!payload) return Observable.empty();

        const config = payload.api ?
          Object.assign<Object, IApiConfig, IApiConfig>({}, apiConfig, payload.api) :
          apiConfig;

        return Observable
          .forkJoin(
            payload.ids.map(id => readEntity({
              config: config,
              id,
              queryParams: payload.queryParams,
            }))
          )
          .map((res: Array<IEntity>) => finishReadBatchEntities(res, meta))
          .takeUntil(action$.ofType(READ_BATCH(entity).CANCEL))
          .catch((error: Error) => Observable.of(failReadBatchEntities(error, meta)));
      })
  );

  return combineEpics<any, any>(
    fetchEntityEpic,
    fetchEntitiesListEpic,
    fetchBatchEntitiesEpic,
  );
}

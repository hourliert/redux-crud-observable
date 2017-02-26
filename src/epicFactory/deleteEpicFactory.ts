import { Observable } from 'rxjs';
import { ActionsObservable, Epic, combineEpics } from 'redux-observable';

import {
  deleteEntity,
  IApiConfig,
} from 'observableApiConnector';
import { IEntity } from 'crudEntity';
import {
  deleteCrudActionsCreatorFactory,
  IRequestDeleteEntityAction,
  IRequestDeleteEntitiesBatchAction,
} from 'actionsCreatorFactory';
import {
  DELETE,
  DELETE_BATCH,
} from 'constantFactory';

import { IEpicParams } from './interfaces';

export default function deleteEpicFactory({
  entity,
  apiConfig,
}: IEpicParams): Epic<any, any> {
  const {
    finishDeleteBatchEntities,
    finishDeleteEntity,

    failDeleteBatchEntities,
    failDeleteEntity,
  } = deleteCrudActionsCreatorFactory(entity);

  const deleteEntityEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(DELETE(entity).REQUEST)
      .switchMap(({ meta, payload }: IRequestDeleteEntityAction) => {
        if (!payload) return Observable.empty();

        const config = payload.api ?
          Object.assign<Object, IApiConfig, IApiConfig>({}, apiConfig, payload.api) :
          apiConfig;

        return deleteEntity({
          config: config,
          id: payload.id,
          queryParams: payload.queryParams,
        })
          .map(() => finishDeleteEntity(payload.id, meta))
          .takeUntil(action$.ofType(DELETE(entity).CANCEL))
          .catch((error: Error) => Observable.of(failDeleteEntity(error, meta)));
      })
  );

  const deleteBatchEntitiesEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(DELETE_BATCH(entity).REQUEST)
      .switchMap(({ meta, payload }: IRequestDeleteEntitiesBatchAction) => {
        if (!payload) return Observable.empty();

        const config = payload.api ?
          Object.assign<Object, IApiConfig, IApiConfig>({}, apiConfig, payload.api) :
          apiConfig;

        return Observable
          .forkJoin(
            payload.ids.map(id => deleteEntity({
              config: config,
              id,
              queryParams: payload.queryParams,
            })),
          )
          .map(() => finishDeleteBatchEntities(payload.ids, meta))
          .takeUntil(action$.ofType(DELETE_BATCH(entity).CANCEL))
          .catch((error: Error) => Observable.of(failDeleteBatchEntities(error, meta)));
      })
  );

  return combineEpics<any, any>(
    deleteEntityEpic,
    deleteBatchEntitiesEpic,
  );
}

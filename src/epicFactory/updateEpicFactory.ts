import { Observable } from 'rxjs';
import { ActionsObservable, Epic, combineEpics } from 'redux-observable';

import {
  updateEntity,
  IApiConfig,
} from 'observableApiConnector';
import { IEntity } from 'crudEntity';
import {
  updateCrudActionsCreatorFactory,
  IRequestUpdateEntityAction,
} from 'actionsCreatorFactory';
import {
  UPDATE,
} from 'constantFactory';

import { IEpicParams } from './interfaces';

export default function updateEpicFactory({
  entity,
  apiConfig,
}: IEpicParams): Epic<any, any> {
  const {
    finishUpdateEntity,
    failUpdateEntity,
  } = updateCrudActionsCreatorFactory(entity);

  const updateEntityEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(UPDATE(entity).REQUEST)
      .switchMap(({ meta, payload }: IRequestUpdateEntityAction) => {
        if (!payload) return Observable.empty();

        const config = payload.api ?
          Object.assign<Object, IApiConfig, IApiConfig>({}, apiConfig, payload.api) :
          apiConfig;

        return updateEntity({
          body: payload.body,
          config: config,
          id: payload.id,
          queryParams: payload.queryParams,
        })
          .map((res: IEntity) => finishUpdateEntity(res, meta))
          .takeUntil(action$.ofType(UPDATE(entity).CANCEL))
          .catch((error: Error) => Observable.of(failUpdateEntity(error, meta)));
      })
  );

  return combineEpics<any, any>(
    updateEntityEpic,
  );
}

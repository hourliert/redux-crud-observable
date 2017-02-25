import { Observable } from 'rxjs';
import { ActionsObservable, Epic, combineEpics } from 'redux-observable';

import {
  createEntity,
  IApiConfig,
} from 'observableApiConnector';
import { IEntity } from 'crudEntity';
import {
  createCrudActionsCreatorFactory,
  IRequestCreateEntityAction,
} from 'actionsCreatorFactory';
import {
  CREATE,
} from 'constantFactory';

import { IEpicParams } from './interfaces';

export default function createEpicFactory({
  entity,
  apiConfig,
}: IEpicParams): Epic<any, any> {
  const {
    finishCreateEntity,
    failCreateEntity,
  } = createCrudActionsCreatorFactory(entity);

  const createEntityEpic: Epic<any, any> = (action$: ActionsObservable<any>) => (
    action$.ofType(CREATE(entity).REQUEST)
      .switchMap(({ meta, payload }: IRequestCreateEntityAction) => {
        if (!payload) return Observable.empty();

        const config = payload.api ?
          Object.assign<Object, IApiConfig, IApiConfig>({}, apiConfig, payload.api) :
          apiConfig;

        return createEntity({
          body: payload.body,
          config: config,
          queryParams: payload.queryParams,
        })
          .map((res: IEntity) => finishCreateEntity(res, meta))
          .takeUntil(action$.ofType(CREATE(entity).CANCEL))
          .catch((error: Error) => Observable.of(failCreateEntity(error, meta)));
      })
  );

  return combineEpics<any, any>(
    createEntityEpic,
  );
}

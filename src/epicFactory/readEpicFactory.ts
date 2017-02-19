import { Observable } from 'rxjs';
import { ActionsObservable, Epic } from 'redux-observable';

import { readEntity, IApiConfig } from 'observableApiConnector';
import { IEntity } from 'crudEntity';
import {
  readCrudActionsCreatorFactory,
  IRequestReadEntityAction,
} from 'actionsCreatorFactory';
import {
  READ,
} from 'constantFactory';

import { IFetchEntityEpicParams } from './interfaces';

export default function readEpicFactory({
  entity,
  apiConfig,
}: IFetchEntityEpicParams): Array<Epic<any, any>> {
  const {
    finishReadEntity,
    failReadEntity,
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

  return [
    fetchEntityEpic,
  ];
}

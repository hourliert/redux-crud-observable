import { get } from 'lodash';

import { CrudState } from 'reducerFactory';
import { createSelector } from 'reselect';

import { ICrudSelectors } from './interfaces';

export default function crudStoreSelectorsFactory(storeKeyPath: string[]): ICrudSelectors {
  const entitiesStoreSelector = (state: any): CrudState => get<CrudState>(state, storeKeyPath);

  const entitiesValueSelector = createSelector(
    entitiesStoreSelector,
    (entitiesStore) => entitiesStore.get('value'),
  );

  const entityBootTimeSelector = createSelector(
    entitiesStoreSelector,
    (entitiesStore) => entitiesStore.get('bootTime'),
  );

  const storeEntitiesCountSelector = createSelector(
    entitiesValueSelector,
    (entitiesValue) => entitiesValue.size,
  );

  return {
    storeEntitiesCountSelector,
    entityBootTimeSelector,
    entitiesValueSelector,
  };
}

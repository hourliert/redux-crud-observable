import { fromJS } from 'immutable';

import { Entity, FormattedEntity, FormattedEntities } from './interfaces';

export function formatEntity(entity: Entity): FormattedEntity {
  return fromJS({
    [entity.hash]: entity,
  });
}

export function formatEntities(entities: Entity[]): FormattedEntities {
  return entities.reduce((res: FormattedEntity, cur: Entity) => (
    res.merge(formatEntity(cur))
  ), fromJS({}));
}

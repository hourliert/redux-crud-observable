import { fromJS } from 'immutable';

import { IEntity, FormattedEntity, FormattedEntities } from './interfaces';

export function formatEntity(entity: IEntity): FormattedEntity {
  return fromJS({
    [entity.hash]: entity,
  });
}

export function formatEntities(entities: IEntity[]): FormattedEntities {
  return entities.reduce((res: FormattedEntity, cur: IEntity) => (
    res.merge(formatEntity(cur))
  ), fromJS({}));
}

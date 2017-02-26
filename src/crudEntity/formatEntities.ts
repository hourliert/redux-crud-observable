import { fromJS } from 'immutable';

import { IEntity, IEntitiesList, FormattedEntity, FormattedEntities } from './interfaces';

export function formatEntity(entity: IEntity): FormattedEntity {
  return fromJS({
    [entity.hash]: entity,
  });
}

export function formatEntities(entities: Array<IEntity>): FormattedEntities {
  return entities.reduce((res: FormattedEntity, cur: IEntity) => (
    res.merge(formatEntity(cur))
  ), fromJS({}));
}

export function formatEntitiesList(entities: IEntitiesList): FormattedEntities {
  return formatEntities(entities.member);
}

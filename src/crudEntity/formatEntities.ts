import { fromJS } from 'immutable';

import { configManager } from 'configManager';

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

export function formatEntitiesList(entitiesList: IEntitiesList): FormattedEntities {
  return formatEntities(entitiesList.member);
}

export function resolveEntityKey(entity: any): IEntity {
  return Object.assign(entity, {
    hash: entity[configManager.entityKey],
  });
}

export function resolveEntitiesKey(entities: Array<any>): Array<IEntity> {
  return entities.map(e => Object.assign(e, {
    hash: e[configManager.entityKey],
  }));
}

export function resolveEntitiesListKey(entitiesList: any): IEntitiesList {
  return Object.assign(entitiesList, {
    member: entitiesList[configManager.memberKey],
  });
}

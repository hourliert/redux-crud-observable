import { fromJS } from 'immutable';

import { configManager } from 'configManager';

import { IEntity, IEntitiesList, FormattedEntity, FormattedEntities } from './interfaces';

export function formatEntity(entity: IEntity): FormattedEntity {
  return fromJS({
    [entity._internalHash]: entity,
  });
}

export function formatEntities(entities: Array<IEntity>): FormattedEntities {
  return entities.reduce((res: FormattedEntity, cur: IEntity) => (
    res.merge(formatEntity(cur))
  ), fromJS({}));
}

export function formatEntitiesList(entitiesList: IEntitiesList): FormattedEntities {
  return formatEntities(entitiesList._internalMember);
}

export function resolveEntityKey(entity: any): IEntity {
  return Object.assign(entity, {
    _internalHash: entity[configManager.entityKey],
  });
}

export function resolveEntitiesKey(entities: Array<any>): Array<IEntity> {
  return entities.map(e => Object.assign(e, {
    _internalHash: e[configManager.entityKey],
  }));
}

export function resolveEntitiesListKey(entitiesList: any): IEntitiesList {
  return Object.assign(entitiesList, {
    _internalMember: entitiesList[configManager.memberKey],
  });
}

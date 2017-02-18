import { Map } from 'immutable';

// todo: make hash configurable
export interface IEntity {
  hash: string;
}

// todo: make member configurable
export interface IEntitiesList {
  member: Array<IEntity>;
}

export type FormattedEntity = Map<string, any>;
export type FormattedEntities = Map<string, any>;

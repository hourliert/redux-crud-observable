import { Map } from 'immutable';

export interface IEntity {
  _internalHash: string;
}

export interface IEntitiesList {
  _internalMember: Array<IEntity>;
}

export type FormattedEntity = Map<string, any>;
export type FormattedEntities = Map<string, any>;

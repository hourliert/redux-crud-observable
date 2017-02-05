import { Map } from 'immutable';

export interface Entity {
  hash: string;
}

export type FormattedEntity = Map<string, any>;
export type FormattedEntities = Map<string, any>;

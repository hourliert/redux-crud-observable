import { Selector } from 'reselect';
import { Map } from 'immutable';

export interface ICrudSelectors {
  storeEntitiesCountSelector: Selector<any, number>;
  entityBootTimeSelector: Selector<any, Date>;
  entitiesValueSelector: Selector<any, Map<string, any>>;
}

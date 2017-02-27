import { Map } from 'immutable';

import selectorFactory from '../selectorFactory';

describe('Selector Factory', () => {
  it('creates the selectors', () => {
    const selectors = selectorFactory([]);

    expect(selectors).toBeDefined();
  });

  it('retrieves the store bootTime', () => {
    const { entityBootTimeSelector } = selectorFactory(['store']);

    const now = new Date();
    const state = {
      store: Map({
        bootTime: now,
      }),
    };

    expect(entityBootTimeSelector(state)).toEqual(now);
  });

  it('retrieves the store value', () => {
    const { entitiesValueSelector } = selectorFactory(['store']);

    const value = Map({
      1: { name: 'Yoda' },
      2: { name: 'Obi Wan' },
    });

    const state = {
      store: Map({
        value,
      }),
    };

    expect(entitiesValueSelector(state)).toEqual(value);
  });

  it('retrieves the store value size', () => {
    const { storeEntitiesCountSelector } = selectorFactory(['store']);

    const value = Map({
      1: { name: 'Yoda' },
      2: { name: 'Obi Wan' },
    });

    const state = {
      store: Map({
        value,
      }),
    };

    expect(storeEntitiesCountSelector(state)).toEqual(2);
  });
});




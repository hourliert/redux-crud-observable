import { formatEntity, formatEntities, formatEntitiesList } from '../formatEntities';

describe('Crud Entities', () => {
  it('formats a crud entity', () => {
    const entity = {
      _internalHash: '1234',
      name: 'Yoda',
    };

    const formattedEntity = formatEntity(entity);
    expect(formattedEntity.toJS()).toEqual({
      1234: {
        _internalHash: '1234',
        name: 'Yoda',
      },
    });
  });

  it('formats an array of crud entity', () => {
    const entity1 = {
      _internalHash: '1234',
      name: 'Yoda',
    };
    const entity2 = {
      _internalHash: '5678',
      name: 'Obi Wan',
    };

    const formattedEntities = formatEntities([entity1, entity2]);
    expect(formattedEntities.toJS()).toEqual({
      1234: {
        _internalHash: '1234',
        name: 'Yoda',
      },
      5678: {
        _internalHash: '5678',
        name: 'Obi Wan',
      },
    });
  });

  it('formats a list of crud entity', () => {
    const entity1 = {
      _internalHash: '1234',
      name: 'Yoda',
    };
    const entity2 = {
      _internalHash: '5678',
      name: 'Obi Wan',
    };

    const formattedEntities = formatEntitiesList({
      _internalMember: [entity1, entity2],
    });
    expect(formattedEntities.toJS()).toEqual({
      1234: {
        _internalHash: '1234',
        name: 'Yoda',
      },
      5678: {
        _internalHash: '5678',
        name: 'Obi Wan',
      },
    });
  });
});

import { formatEntity, formatEntities } from '../formatEntities';

describe('Crud Entities', () => {
  it('formats a crud entity', () => {
    const entity = {
      hash: '1234',
      name: 'Yoda',
    };

    const formattedEntity = formatEntity(entity);
    expect(formattedEntity.toJS()).toEqual({
      1234: {
        hash: '1234',
        name: 'Yoda',
      },
    });
  });

  it('formats an array of crud entity', () => {
    const entity1 = {
      hash: '1234',
      name: 'Yoda',
    };
    const entity2 = {
      hash: '5678',
      name: 'Obi Wan',
    };

    const formattedEntities = formatEntities([entity1, entity2]);
    expect(formattedEntities.toJS()).toEqual({
      1234: {
        hash: '1234',
        name: 'Yoda',
      },
      5678: {
        hash: '5678',
        name: 'Obi Wan',
      },
    });
  });
});

import { INIT_STORE } from '../store';

describe('STORE constant factory', () => {
  const ENTITY = 'NINJA';

  it('creates an object containing INIT constants', () => {
    const constant = INIT_STORE(ENTITY);

    expect(constant).toEqual('INIT_NINJAS_STORE');
  });
});

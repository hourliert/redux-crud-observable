import { sayHi } from '../index';

describe('index', () => {
  it('tests the index', () => {
    expect(sayHi()).toEqual('Hi!');
  });
});

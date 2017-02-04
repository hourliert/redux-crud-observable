import { sayHi } from '../index';

describe('index', () => {
  it('says hi to John', () => {
    expect(sayHi()).toEqual('Hi John!');
  });

  it('says hi to Thomas', () => {
    expect(sayHi('Thomas')).toEqual('Hi Thomas!');
  });
});

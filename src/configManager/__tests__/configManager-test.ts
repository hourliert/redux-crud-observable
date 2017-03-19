import { configManager, setEntityKey, setMemberKey } from '../configManager';

describe('Config Manager', () => {
  it('gets the config manager', () => {
    expect(configManager).toBeDefined();
  });

  it('sets the entity key in the config manager', () => {
    setEntityKey('test');
    expect(configManager.entityKey).toEqual('test');
  });

  it('sets the member key in the config manager', () => {
    setMemberKey('test');
    expect(configManager.memberKey).toEqual('test');
  });
});

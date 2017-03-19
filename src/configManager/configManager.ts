import { IConfigManager } from './interfaces';

class ConfigManager implements IConfigManager {
  public entityKey: string = 'hash';
  public memberKey: string = 'member';
}

export let configManager: IConfigManager = new ConfigManager();
export function setEntityKey(key: string): void {
  configManager.entityKey = key;
}

export function setMemberKey(key: string): void {
  configManager.memberKey = key;
}

export function resetConfig(): void {
  configManager = new ConfigManager();
}

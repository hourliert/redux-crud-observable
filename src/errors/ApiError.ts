import { IApiError } from './interfaces';

export default class ApiError extends Error implements IApiError {
  public data: any;
  public status: number;
}

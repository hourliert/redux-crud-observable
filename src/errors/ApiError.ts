import { IApiError } from './interfaces';

export default class ApiError extends Error implements IApiError {
  get data(): any {
    return this.data;
  }

  get status(): number {
    return this.status;
  }

  set data(d: any) {
    this.data = d;
  }

  set status(s: number) {
    this.status = s;
  }
}

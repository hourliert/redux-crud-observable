export interface IApiError extends Error {
  data?: any;
  status?: number;
}

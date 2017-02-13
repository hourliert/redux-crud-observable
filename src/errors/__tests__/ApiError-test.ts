import ApiError from '../ApiError';

describe('ApiError', () => {
  it('create an ApiError', () => {
    const error = new ApiError();

    error.data = 'Error';
    error.status = 500;

    expect(error).toBeInstanceOf(Error);
    expect(error.data).toEqual('Error');
    expect(error.status).toEqual(500);
  });
});

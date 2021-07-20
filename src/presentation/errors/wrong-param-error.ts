export class WrongParamError extends Error {
  constructor(paramName: string) {
    super(`Wrong param: ${paramName}`);
    this.name = 'WrongParamError';
  }
}

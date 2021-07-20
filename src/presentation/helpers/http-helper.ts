import { ServerError } from '../errors/server-error';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const WorngFieldsRequest = (errors: string[]): HttpResponse => {
  return {
    statusCode: 400,
    body: errors.join(' '),
  };
};

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: {
    message: 'No tour found with that ID',
  },
});

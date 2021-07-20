import { noContent, ok, serverError } from '../../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadProperties,
} from './load-properties-controller-protocols';

export class LoadPropertiesController implements Controller {
  constructor(private readonly loadProperties: LoadProperties) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const properties = await this.loadProperties.load(httpRequest.query);
      return properties.length ? ok(properties) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

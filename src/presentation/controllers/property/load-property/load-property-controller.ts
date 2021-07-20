import { notFound, ok, serverError } from '../../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadProperty,
} from './load-property-controller-protocols';

export class LoadPropertyController implements Controller {
  constructor(private readonly loadProperty: LoadProperty) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;
      const property = await this.loadProperty.load(id);
      return property ? ok(property) : notFound();
    } catch (error) {
      return serverError(error);
    }
  }
}

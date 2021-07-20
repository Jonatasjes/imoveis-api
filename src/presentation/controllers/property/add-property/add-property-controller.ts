import { badRequest, noContent, serverError } from '../../../helpers/http-helper';
import {
  AddProperty,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-property-controller-protocols';

export default class AddPropertyController implements Controller {
  constructor(private readonly validation: Validation, private readonly addProperty: AddProperty) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const body = { ...httpRequest.body, publication_date: new Date() };
      const error = this.validation.validate(body);
      if (error) {
        return badRequest(error);
      }
      const {
        publication_date,
        title,
        description,
        value,
        area,
        address,
        public_place,
        number,
        adjunct,
        neighborhood,
        zip_code,
        city,
        state,
      } = body;
      await this.addProperty.add({
        publication_date,
        title,
        description,
        value,
        area,
        address,
        public_place,
        number,
        adjunct,
        neighborhood,
        zip_code,
        city,
        state,
      });
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

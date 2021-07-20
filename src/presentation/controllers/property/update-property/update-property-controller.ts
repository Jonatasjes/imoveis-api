import { VerifyInputField } from '../../../../validation/validators/verify-input-field';
import {
  badRequest,
  notFound,
  ok,
  serverError,
  WorngFieldsRequest,
} from '../../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  UpdateProperty,
} from './update-property-controller-protocols';

export class UpdatePropertyController implements Controller {
  constructor(private readonly UpdateProperty: UpdateProperty) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const updateData = {
        id: httpRequest.params.id,
        body: { ...httpRequest.body, publication_date: new Date() },
      };

      const errors = new VerifyInputField().verify(updateData.body);

      if (errors) {
        return WorngFieldsRequest(errors);
      }

      const property = await this.UpdateProperty.update(updateData);

      return property ? ok(property) : notFound();
    } catch (error) {
      return serverError(error);
    }
  }
}

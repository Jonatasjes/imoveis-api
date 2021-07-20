import { WrongParamError } from '../../presentation/errors/wrong-param-error';
import { HttpRequest } from '../../presentation/protocols';
import { VerifyFields } from '../../presentation/protocols/verify-fields';

export class VerifyInputField implements VerifyFields {
  verify(body: any): string[] {
    const inputs = [
      'publication_date',
      'title',
      'description',
      'value',
      'area',
      'address',
      'public_place',
      'number',
      'adjunct',
      'neighborhood',
      'zip_code',
      'city',
      'state',
    ];
    const { _id, ...b } = body;
    const fields = Object.keys({ ...b });
    const errors = fields.filter(field => {
      const value = inputs.filter(value => {
        if (value === field) {
          return value;
        }
      });

      if (!value.length) {
        return new WrongParamError(field);
      }
    });
    if (errors.length) {
      return errors;
    }
  }
}

import {
  UpdateProperty,
  PropertyModel,
  UpdatePropertyModel,
  HttpRequest,
} from './update-property-controller-protocols';

import MockDate from 'mockdate';
import { notFound, ok, serverError, WorngFieldsRequest } from '../../../helpers/http-helper';
import { UpdatePropertyController } from './update-property-controller';
import { VerifyFields } from '../../../protocols/verify-fields';
import { WrongParamError } from '../../../errors/wrong-param-error';

const makeFakeProperty = (): PropertyModel => {
  return {
    _id: 'any_id',
    publication_date: new Date(),
    title: 'any_title',
    description: 'any_description',
    value: 0,
    area: 'any_area',
    address: 'any_address',
    public_place: 'any_public_place',
    number: 'any_number',
    adjunct: 'any_adjunct',
    neighborhood: 'any_neighborhood',
    zip_code: 'any_zip_code',
    city: 'any_city',
    state: 'any_state',
  };
};

const makeFakeResponse = (): HttpRequest => {
  return {
    body: {
      _id: 'any_id',
      publication_date: new Date(),
      title: 'new_title',
      description: 'any_description',
      value: 'any_value',
      area: 'any_area',
      address: 'any_address',
      public_place: 'any_public_place',
      number: 'any_number',
      adjunct: 'any_adjunct',
      neighborhood: 'any_neighborhood',
      zip_code: 'any_zip_code',
      city: 'any_city',
      state: 'any_state',
    },
  };
};

const makeFakeWorngRequest = (): HttpRequest => {
  return {
    params: {
      id: 'any_id',
    },
    body: {
      publication_date: new Date(),
      title: 'any_title',
      descriptionnn: 'any_description',
    },
  };
};

interface SutTypes {
  sut: UpdatePropertyController;
  updatePropertyStub: UpdateProperty;
  veryfyFieldsStub: VerifyFields;
}

const makeUpdateProperty = (): UpdateProperty => {
  class UpdatePropertyStub implements UpdateProperty {
    async update(updateData: UpdatePropertyModel): Promise<PropertyModel | null> {
      return new Promise(resolve => resolve(makeFakeProperty()));
    }
  }
  return new UpdatePropertyStub();
};

const makeVerifyFields = (): VerifyFields => {
  class VerifyInputFieldStub implements VerifyFields {
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
        const value = inputs.filter(value => value === field);
        if (!value.length) {
          return new WrongParamError(field);
        }
      });
      if (errors.length) {
        return errors;
      }
    }
  }
  return new VerifyInputFieldStub();
};

const makeSut = (): SutTypes => {
  const veryfyFieldsStub = makeVerifyFields();
  const updatePropertyStub = makeUpdateProperty();
  const sut = new UpdatePropertyController(updatePropertyStub);
  return {
    sut,
    updatePropertyStub,
    veryfyFieldsStub,
  };
};

describe('LoadProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should return 400 if have values incorrects', async () => {
    const { sut, veryfyFieldsStub } = makeSut();
    const veryfyFieldsSpy = jest
      .spyOn(veryfyFieldsStub, 'verify')
      .mockReturnValueOnce([`{ statusCode: 400, body: 'descriptionnn' }`]);
    const httpRequest = makeFakeWorngRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(WorngFieldsRequest(['descriptionnn']));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: { id: 'any_id' },
      body: {
        title: 'new_title',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(httpResponse.body));
  });

  test('Should return 404 if any property is not found', async () => {
    const { sut, updatePropertyStub } = makeSut();
    jest
      .spyOn(updatePropertyStub, 'update')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const httpRequest = {
      params: 'worng_id',
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(notFound());
  });

  test('Should return 500 if UpdateProperty throws', async () => {
    const { sut, updatePropertyStub } = makeSut();
    jest
      .spyOn(updatePropertyStub, 'update')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});

import { DeleteProperty, PropertyModel } from './delete-property-controller-protocols';

import MockDate from 'mockdate';
import { badRequest, noContent, notFound, ok, serverError } from '../../../helpers/http-helper';
import { DeletePropertyController } from './delete-property-controller';
import { MissingParamError } from '../../../errors/missing-param-error';

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

interface SutTypes {
  sut: DeletePropertyController;
  deletePropertyStub: DeleteProperty;
}

const makeDeleteProperty = (): DeleteProperty => {
  class DeletePropertyStub implements DeleteProperty {
    async delete(id: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new DeletePropertyStub();
};

const makeSut = (): SutTypes => {
  const deletePropertyStub = makeDeleteProperty();
  const sut = new DeletePropertyController(deletePropertyStub);
  return {
    sut,
    deletePropertyStub,
  };
};

describe('DeleteProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should return 204 on success', async () => {
    const { sut, deletePropertyStub } = makeSut();
    const httpRequest = {
      params: { id: 'any_id' },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 400 if ID is undefined', async () => {
    const { sut, deletePropertyStub } = makeSut();
    const httpRequest = {
      params: { id: {} },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')));
  });

  test('Should return 500 if DeleteProperty throws', async () => {
    const { sut, deletePropertyStub } = makeSut();
    jest
      .spyOn(deletePropertyStub, 'delete')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});

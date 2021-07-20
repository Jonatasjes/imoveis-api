import { PropertyModel, UpdatePropertyModel } from '../../../domain/models/property';
import { HttpRequest } from '../../../presentation/protocols';
import { UpdatePropertyRepository } from '../../protocols/db/property/update-property-repository';
import { DbUpdateProperty } from './db-update-property';

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

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    params: {
      id: 'any_id',
    },
    body: {
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
    },
  };
};

interface SutTypes {
  sut: DbUpdateProperty;
  updatePropertyRepositoryStub: UpdatePropertyRepository;
}
const makeUpdatePropertyRepository = (): UpdatePropertyRepository => {
  class UpdatePropertyRepositoryStub implements UpdatePropertyRepository {
    async update(updateData: UpdatePropertyModel): Promise<PropertyModel | null> {
      return new Promise(resolve => resolve(makeFakeProperty()));
    }
  }
  return new UpdatePropertyRepositoryStub();
};

const makeSut = (): SutTypes => {
  const updatePropertyRepositoryStub = makeUpdatePropertyRepository();
  const sut = new DbUpdateProperty(updatePropertyRepositoryStub);
  return {
    sut,
    updatePropertyRepositoryStub,
  };
};

describe('DbUpdateProperty', () => {
  test('Should call UpdatePropertyRepository', async () => {
    const { sut, updatePropertyRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updatePropertyRepositoryStub, 'update');
    const httpRequest = {
      params: {
        id: 'any_id',
      },
      body: {
        title: 'new_title',
        description: 'new_description',
      },
    };
    const data = {
      id: httpRequest.params.id,
      body: httpRequest.body,
    };
    await sut.update(data);
    expect(updateSpy).toHaveBeenCalled();
  });

  test('Should return a Property on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'any_id',
      },
      body: {
        title: 'new_title',
        description: 'new_description',
      },
    };
    const data = {
      id: httpRequest.params.id,
      body: httpRequest.body,
    };
    const property = await sut.update(data);
    expect(property._id).toEqual('any_id');
  });

  test('Should throw if UpdatePropertyRepository throws', async () => {
    const { sut, updatePropertyRepositoryStub } = makeSut();
    jest
      .spyOn(updatePropertyRepositoryStub, 'update')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const httpRequest = {
      params: {
        id: 'any_id',
      },
      body: {
        title: 'new_title',
        description: 'new_description',
      },
    };
    const data = {
      id: httpRequest.params.id,
      body: httpRequest.body,
    };
    const promise = sut.update(data);
    await expect(promise).rejects.toThrow();
  });
});

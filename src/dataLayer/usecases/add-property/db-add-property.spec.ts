import { DbAddProperty } from './db-add-property';
import { AddPropertyModel, AddPropertyRepository } from './db-add-property-protocols';

import MockDate from 'mockdate';

const makePropertyData = (): AddPropertyModel => ({
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
});

const makeAddPropertyRepository = (): AddPropertyRepository => {
  class AddPropertyRepositoryStub implements AddPropertyRepository {
    async add(data: AddPropertyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddPropertyRepositoryStub();
};

interface SutTypes {
  sut: DbAddProperty;
  addPropertyRepositoryStub: AddPropertyRepository;
}

const makeSut = (): SutTypes => {
  const addPropertyRepositoryStub = makeAddPropertyRepository();
  const sut = new DbAddProperty(addPropertyRepositoryStub);
  return {
    sut,
    addPropertyRepositoryStub,
  };
};

describe('DbAddProperty UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  beforeAll(() => {
    MockDate.reset();
  });

  test('Should call AddPropertyRepository with correct values', async () => {
    const { sut, addPropertyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addPropertyRepositoryStub, 'add');
    const propertyData = makePropertyData();
    await sut.add(propertyData);
    expect(addSpy).toHaveBeenCalledWith(propertyData);
  });

  test('Should throw if AddPropertRepository throws', async () => {
    const { sut, addPropertyRepositoryStub } = makeSut();
    jest
      .spyOn(addPropertyRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.add(makePropertyData());
    await expect(promise).rejects.toThrow();
  });
});

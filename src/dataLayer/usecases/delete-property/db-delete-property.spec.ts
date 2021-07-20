import { DbDeleteProperty } from './db-delete-property';
import { DeletePropertyRepository, PropertyModel } from './db-delete-property-protocols';

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
  sut: DbDeleteProperty;
  deletePropertyRepositoryStub: DeletePropertyRepository;
}
const makeDeletePropertyRepository = (): DeletePropertyRepository => {
  class DeletePropertyRepositoryStub implements DeletePropertyRepository {
    async delete(id: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new DeletePropertyRepositoryStub();
};

const makeSut = (): SutTypes => {
  const deletePropertyRepositoryStub = makeDeletePropertyRepository();
  const sut = new DbDeleteProperty(deletePropertyRepositoryStub);
  return {
    sut,
    deletePropertyRepositoryStub,
  };
};

describe('DbDeleteProperty', () => {
  test('Should call DeletePropertyRepository', async () => {
    const { sut, deletePropertyRepositoryStub } = makeSut();
    const deleteAllSpy = jest.spyOn(deletePropertyRepositoryStub, 'delete');

    await sut.delete('any_id');
    expect(deleteAllSpy).toHaveBeenCalled();
  });

  test('Should throw if DeletePropertyRepository throws', async () => {
    const { sut, deletePropertyRepositoryStub } = makeSut();
    jest
      .spyOn(deletePropertyRepositoryStub, 'delete')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.delete('any_id');
    await expect(promise).rejects.toThrow();
  });
});

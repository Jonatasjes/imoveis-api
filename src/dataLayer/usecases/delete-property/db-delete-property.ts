import { DeleteProperty, DeletePropertyRepository } from './db-delete-property-protocols';

export class DbDeleteProperty implements DeleteProperty {
  constructor(private readonly loadPropertyRepository: DeletePropertyRepository) {}
  async delete(id: string): Promise<void> {
    await this.loadPropertyRepository.delete(id);
  }
}

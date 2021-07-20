export interface DeletePropertyRepository {
  delete(id: string): Promise<void>;
}

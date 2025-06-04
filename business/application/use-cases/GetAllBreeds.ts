import { Breed } from '@/business/domain/entities/Breed'
import type { IBreedRepository } from '@/business/domain/repositories/IBreedRepository'

export class GetAllBreeds {
  constructor(private readonly repo: IBreedRepository) {}

  async execute(): Promise<Breed[]> {
    return await this.repo.findAll()
  }
}
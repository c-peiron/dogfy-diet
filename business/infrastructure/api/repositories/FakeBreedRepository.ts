import type { IBreedRepository } from '@/business/domain/repositories/IBreedRepository'
import { Breed } from '@/business/domain/entities/Breed'

export class FakeBreedRepository implements IBreedRepository {
  async findAll(): Promise<Breed[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const data = [
      { name: 'Labrador', count: 124 },
      { name: 'Bulldog', count: 97 },
      { name: 'Golden Retriever', count: 83 },
      { name: 'Beagle', count: 56 },
      { name: 'Poodle', count: 43 },
    ]
    return data.map(Breed.fromObject)
  }
}
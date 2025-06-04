import { Breed } from '@/business/domain/entities/Breed'

export interface IBreedRepository {
  findAll(): Promise<Breed[]>
}
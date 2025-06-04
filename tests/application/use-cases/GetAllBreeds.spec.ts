import { describe, it, expect, vi } from 'vitest'
import { GetAllBreeds } from '@/business/application/use-cases/GetAllBreeds'
import type { IBreedRepository } from '@/business/domain/repositories/IBreedRepository'
import { Breed } from '@/business/domain/entities/Breed'

describe('GetAllBreeds Use Case', () => {
  it('should return a list of breeds from the repository', async () => {
    // Arrange: Creamos un mock del repositorio
    const mockRepo: IBreedRepository = {
      findAll: vi.fn().mockResolvedValue([
        new Breed('Labrador', 123),
        new Breed('Golden', 99),
      ])
    }

    const useCase = new GetAllBreeds(mockRepo)

    // Act: ejecutamos el caso de uso
    const result = await useCase.execute()

    // Assert: verificamos que devuelve los datos esperados
    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Labrador')
    expect(result[1].count).toBe(99)
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1)
  })

  it('should return an empty array if no breeds are found', async () => {
    const mockRepo: IBreedRepository = {
      findAll: vi.fn().mockResolvedValue([])
    }

    const useCase = new GetAllBreeds(mockRepo)
    const result = await useCase.execute()

    expect(result).toEqual([])
  })
})
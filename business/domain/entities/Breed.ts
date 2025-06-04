export class Breed {
  constructor(
    public readonly name: string,
    public readonly count: number
  ) {}

  static fromObject(obj: { name: string; count: number }): Breed {
    return new Breed(obj.name, obj.count)
  }

  toString(): string {
    return `${this.name} (${this.count})`
  }
}
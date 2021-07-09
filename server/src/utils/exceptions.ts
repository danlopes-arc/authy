export class ValidationError<Entity> extends Error {
  constructor(
    public readonly field: keyof Entity,
    public readonly message: string,
  ) {
    super();
  }
}

export class UsecaseProxy<T> {
  constructor(private readonly usecase: T) {}
  getInstance(): T {
    return this.usecase;
  }
}

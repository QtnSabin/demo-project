export class GetTotalNumber {
  public constructor() {}

  public execute(data: Record<string, unknown>) {
    return this.calculateSum(data);
  }

  private calculateSum(data: any): number {
    if (typeof data === 'number') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.reduce((acc, item) => acc + this.calculateSum(item), 0);
    }

    if (typeof data === 'object' && data !== null) {
      return Object.values(data).reduce((acc: number, value) => acc + this.calculateSum(value), 0);
    }

    return 0;
  }
}

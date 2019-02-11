export class DataObjectClass {
  public oid: string;
  public updateTimestamp: Date;

  public toString(): string {
    return this.oid;
  }
}

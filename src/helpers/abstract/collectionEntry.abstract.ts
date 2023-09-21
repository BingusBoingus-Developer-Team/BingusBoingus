export abstract class ACollectionEntry<T> {
  abstract name(): string;

  public valid(): boolean {
    if (this.name() && this.execute) {
      console.log('command-name: ' + this.name());
      return true;
    } else {
      console.error("couldn't read command:");
      console.error(this);
      return false;
    }
  }

  public abstract execute(arg: T): Promise<boolean>;

  protected async run(command: () => any): Promise<boolean> {
    try {
      await command();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

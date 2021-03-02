export class RandomDeck<T> {
  public readonly name: string;
  private readonly variants: T[];
  private cards: T[] = [];
  private storageName?: string;

  constructor(name: string, variants: T[], storageName?: string) {
    this.name = name;
    this.variants = variants;
    this.storageName = storageName;
    this.tryLoadFromStorage();
    this.tryRefill();
  }

  public draw(): T | undefined {
    const card = this.cards.pop();

    this.tryRefill();
    this.trySaveToStorage();

    return card;
  }

  private tryRefill(): void {
    if (!this.cards.length) {
      this.refill();
      this.trySaveToStorage();
    }
  }

  private tryLoadFromStorage(): void {
    if (!this.storageName || !sessionStorage) {
      return;
    }

    const storedContent = sessionStorage.getItem(this.getStorageKey());
    this.cards = JSON.parse(storedContent || '[]');
  }

  private trySaveToStorage(): void {
    if (!this.storageName || !sessionStorage) {
      return;
    }

    const storedContent = JSON.stringify(this.cards, null, 2);
    sessionStorage.setItem(this.getStorageKey(), storedContent);
  }

  private getStorageKey(): string {
    return `${this.storageName}.${this.name}`;
  }

  private refill(): void {
    this.cards = [...this.variants];

    for (let i = this.variants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

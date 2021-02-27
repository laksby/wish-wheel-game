export class RandomDeck<T> {
  public readonly name: string;
  private readonly variants: T[];
  private cards: T[] = [];

  constructor(name: string, variants: T[]) {
    this.name = name;
    this.variants = variants;
    this.refill();
  }

  public draw(): T | undefined {
    const card = this.cards.pop();

    if (!this.cards.length) {
      this.refill();
    }

    return card;
  }

  public getRemainingCards(): T[] {
    return [...this.cards];
  }

  private refill(): void {
    this.cards = [...this.variants];

    for (let i = this.variants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

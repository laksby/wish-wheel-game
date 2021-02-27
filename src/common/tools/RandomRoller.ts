import { RandomDeck } from './RandomDeck';

export class RandomRoller<T> {
  private readonly decks: Map<string, RandomDeck<T>>;

  constructor(sourceData: Record<string, T[]>) {
    this.decks = new Map(
      Object.entries(sourceData).map(([deckName, variants]) => [
        deckName,
        new RandomDeck(deckName, variants),
      ]),
    );
  }

  public draw(deckName: string): T | undefined {
    const deck = this.decks.get(deckName);

    if (!deck) {
      return undefined;
    }

    const card = deck.draw();
    return card;
  }

  public dumpState(): string[] {
    return Array.from(this.decks.values()).map(
      deck => `${deck.name}: ${deck.getRemainingCards().join('; ')}`,
    );
  }
}

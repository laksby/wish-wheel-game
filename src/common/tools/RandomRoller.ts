import { RandomDeck } from './RandomDeck';

interface Options<T> {
  records: Record<string, T[]>;
  storageName?: string;
}

export class RandomRoller<T> {
  private readonly decks: Map<string, RandomDeck<T>>;

  constructor(options: Options<T>) {
    this.decks = new Map(
      Object.entries(options.records).map(([deckName, variants]) => [
        deckName,
        new RandomDeck(deckName, variants, options.storageName),
      ]),
    );
  }

  public initialize(): void {
    this.decks.forEach(deck => deck.initialize());
  }

  public draw(deckName: string): T | undefined {
    const deck = this.decks.get(deckName);

    if (!deck) {
      return undefined;
    }

    const card = deck.draw();
    return card;
  }
}

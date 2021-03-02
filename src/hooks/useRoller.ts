import { useMemo } from 'react';
import { RandomRoller } from '../common';

export function useRoller(records: Record<string, string[]>): RandomRoller<string> {
  return useMemo(() => {
    const roller = new RandomRoller<string>({
      records,
      storageName: 'game',
    });

    return roller;
  }, [records]);
}

import { useMemo } from 'react';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import { RandomRoller } from '../common';

export function useRoller(records: Record<string, string[]>): RandomRoller<string> {
  const roller = useMemo(() => {
    const roller = new RandomRoller<string>({
      records,
      storageName: 'game',
    });

    return roller;
  }, [records]);

  useEffectOnce(() => {
    roller.initialize();
  });

  return roller;
}

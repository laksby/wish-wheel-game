import { ReactNode } from 'react';
import { KeyFilter } from 'react-use/lib/useKey';

export interface ControlData {
  text: ReactNode;
  type: string;
  payload: any;
  key?: string | KeyFilter;
}

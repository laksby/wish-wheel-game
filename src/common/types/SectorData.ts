import { SectorContentType } from './SectorContentType';

export interface SectorData {
  color: string;
  image: string;
  type: string;
  contentType?: SectorContentType;
}

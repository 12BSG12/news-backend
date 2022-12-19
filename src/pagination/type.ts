import { PageOptionsDto } from './pageOptions.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

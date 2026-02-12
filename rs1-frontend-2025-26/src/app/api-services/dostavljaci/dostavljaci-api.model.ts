import {PageRequest} from '../../core/models/paging/page-request';
import {BasePagedQuery} from '../../core/models/paging/base-paged-query';
import {PageResult} from '../../core/models/paging/page-result';

export interface DostavljaciResponse{
 id : number,
naziv : string,
  kod : string,
  isAktivan: boolean
  tip: TipDostavljaca

}



export enum TipDostavljaca{
  Interni = 1,
  Eksterni = 2,
  Freelance = 3
}

export interface upsertDostavljacDto{
  naziv : string,
  kod : string,
  isAktivan: boolean
  tip: TipDostavljaca
}

export class DostavljaciListRequest extends BasePagedQuery{
  search? : string
}

export type DostavljaciListResponse = PageResult<DostavljaciResponse>

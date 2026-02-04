import {PageResult} from '../../core/models/paging/page-result';
import {PageRequest} from '../../core/models/paging/page-request';
import {BasePagedQuery} from '../../core/models/paging/base-paged-query';


export interface ResponseDostavljacDto {
  naziv : string,
  tip : TipDostavljaca,
  kod : string,
  aktivan : boolean,
  id : number

}

export enum TipDostavljaca {
  Interni = 1,
  Eksterni = 2,
  Freelance = 3
}

export interface upsertDostavljac{
  naziv : string,
  tip : TipDostavljaca,
  kod : string,
  aktivan : boolean,
}

export class DostavljaciListRequest extends BasePagedQuery{
search? : string |null;
}

export type DostavljacListResponse = PageResult<ResponseDostavljacDto>

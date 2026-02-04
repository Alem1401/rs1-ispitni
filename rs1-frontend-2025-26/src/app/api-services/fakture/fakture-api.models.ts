import { PageResult } from '../../core/models/paging/page-result';
import {BasePagedQuery} from '../../core/models/paging/base-paged-query';

// === ENUMS ===

/**
 * Tip fakture enum
 * Corresponds to: FakturaTip.cs
 */
export enum FakturaTip {
  /** Ulazna faktura - unos robe / povećanje zaliha */
  Ulazna = 1,
  /** Izlazna faktura - iznos robe / smanjenje zaliha */
  Izlazna = 2
}

// === QUERIES (READ) ===

/**
 * Response item for GET /Fakture
 * Corresponds to: ListFaktureQueryDto.cs
 */
export interface ListFaktureQueryDto {
  id: number;
  brojRacuna: string;
  tip: FakturaTip;
  datumKreiranja: string; // ISO date string
  brojStavki: number;
}

/**
 * Paged response for GET /Fakture
 */
export interface FakturaStavkaDto {
  name : string,
  categoryId : number,
  quantity : number
}

export class getFaktureList extends BasePagedQuery{

}

export interface CreateFakturaCommand{
  broj : string,
  tip : FakturaTip,
  napomena?: string |null
  stavke : FakturaStavkaDto[]
}

export type ListFaktureResponse = PageResult<ListFaktureQueryDto>;

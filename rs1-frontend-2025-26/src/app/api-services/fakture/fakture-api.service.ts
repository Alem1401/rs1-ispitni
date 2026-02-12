import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {FakturaListQuery, FakturaUpsertDto, ListFaktureResponse} from './fakture-api.models';
import {buildHttpParams} from '../../core/models/build-http-params';

@Injectable({
  providedIn: 'root'
})
export class FaktureApiService {
  private readonly baseUrl = `${environment.apiUrl}/Fakture`;
  private http = inject(HttpClient);

  /**
   * GET /Fakture
   * List fakture with pagination.
   */
  list(request? : FakturaListQuery): Observable<ListFaktureResponse> {
    const params = request ? buildHttpParams(request) : undefined;
    return this.http.get<ListFaktureResponse>(this.baseUrl, { params });
  }

  create(faktura: FakturaUpsertDto) {
    return this.http.post<number>(this.baseUrl, faktura);
  }
}

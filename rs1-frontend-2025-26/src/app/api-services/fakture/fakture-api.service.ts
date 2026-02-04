import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {CreateFakturaCommand, getFaktureList, ListFaktureResponse} from './fakture-api.models';
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

  create(payload : CreateFakturaCommand){
  return   this.http.post<number>(this.baseUrl, payload)
  }

  list(query?: getFaktureList): Observable<ListFaktureResponse> {
    const params = query ? buildHttpParams(query) as any : undefined;

    return this.http.get<ListFaktureResponse>(this.baseUrl, { params });
  }
}

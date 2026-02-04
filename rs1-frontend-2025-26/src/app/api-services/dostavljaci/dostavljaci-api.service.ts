import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {
  DostavljaciListRequest,
  DostavljacListResponse,
  ResponseDostavljacDto,
  upsertDostavljac
} from './dostavljaci-api.model';
import {buildHttpParams} from '../../core/models/build-http-params';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DostavljaciApiService {
  private readonly baseUrl = `${environment.apiUrl}/Dostavljaci`;
  private http = inject(HttpClient);

  list(request? : DostavljaciListRequest) : Observable<DostavljacListResponse> {
    const params  = request? buildHttpParams(request) as any : undefined;
    return this.http.get<DostavljacListResponse>(this.baseUrl,{params})
  }

  create(toAdd : upsertDostavljac){
    return this.http.post(this.baseUrl, toAdd)
  }

  updateDostavljac(toAdd: upsertDostavljac, id : number){
    return this.http.put(`${this.baseUrl}/${id}`, toAdd)
  }

  deleteDostavljac(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  getById(id: number){
    return this.http.get<ResponseDostavljacDto>(`${this.baseUrl}/${id}`)
  }
}

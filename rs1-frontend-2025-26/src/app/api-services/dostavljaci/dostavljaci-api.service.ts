import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {
  DostavljaciListRequest,
  DostavljaciListResponse,
  DostavljaciResponse,
  upsertDostavljacDto
} from './dostavljaci-api.model';
import {buildHttpParams} from '../../core/models/build-http-params';

@Injectable({
  providedIn: 'root',
})
export class DostavljaciApiService {
  private readonly baseUrl = `${environment.apiUrl}/Dostavljaci`;
  private http = inject(HttpClient);

  list(request? : DostavljaciListRequest){
    const params = request ? buildHttpParams(request) as any : undefined;
  return  this.http.get<DostavljaciListResponse>(this.baseUrl,{params});
  }

  getById(id : number){
    return this.http.get<DostavljaciResponse>(`${this.baseUrl}/${id}`);
  }

  create(payload : upsertDostavljacDto){
    return this.http.post(this.baseUrl, payload);
  }

  update(payload : upsertDostavljacDto,id : number  ){
    return this.http.put(`${this.baseUrl}/${id}`, payload);
  }

  delete(id : number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

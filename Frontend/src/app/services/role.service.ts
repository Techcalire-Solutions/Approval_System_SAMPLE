import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../common/interfaces/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private _http: HttpClient) { }

  url = 'http://localhost:8000';

  // ROLE..........
  addRole(data: any) {
    return this._http.post(this.url + "/role", data);
  }

  getRole(filterValue?: string, page?: number, pagesize?:number): Observable<Role[]> {
    return this._http.get<Role[]>(this.url + `/role/find/?search=${filterValue}&page=${page}&pageSize=${pagesize}`);
  }
}

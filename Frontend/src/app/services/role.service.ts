import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../common/interfaces/role';  // Ensure this path is correct
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private _http: HttpClient) { }

  url = 'http://localhost:8000';

  // Method to add a role
  addRole(data: any): Observable<any> {
    return this._http.post(this.url + "/role", data);
  }

  // Method to get all roles
  getRole(): Observable<Role[]> {
    return this._http.get<Role[]>(this.url + "/role");
  }
}

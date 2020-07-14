import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Character } from 'src/app/character/character';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../utils/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClient: HttpClient) { }

  getList(pagination: Pagination): Promise<Character[]> {
    return this.httpClient.get<Character[]>(`${environment.api.url}/characters?limit=${pagination.limit}&offset=${pagination.offset}&name=${pagination.term}`).toPromise();
  }
}

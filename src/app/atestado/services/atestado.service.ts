import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtestadoInterface } from '../types/atestado.interface';

@Injectable({
  providedIn: 'root'
})
export class AtestadoService {

  private url = 'http://localhost:3000/atestados';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAtestados(): Observable<AtestadoInterface[]> {
    return this.httpClient.get<AtestadoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAtestado(id: number): Observable<AtestadoInterface> {
    return this.httpClient.get<AtestadoInterface>(`${this.url}/${id}`);
  }

  private adicionar(atestado: AtestadoInterface)  {
    return this.httpClient.post(this.url, atestado);
  }

  private atualizar(atestado: AtestadoInterface) {
    return this.httpClient.put(`${this.url}/${atestado.id}`, atestado);
  }

  salvar(atestado: AtestadoInterface) {
    if(atestado.id) {
      return this.atualizar(atestado);
    } else {
      return this.adicionar(atestado);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcacaoInterface } from '../types/marcacao.interface';

@Injectable({
  providedIn: 'root'
})
export class MarcacaoService {

  private url = 'http://localhost:3000/marcacoes';

  constructor(
    private httpClient: HttpClient
  ) {}

  getMarcacoes(): Observable<MarcacaoInterface[]> {
    return this.httpClient.get<MarcacaoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getMarcacao(id: number): Observable<MarcacaoInterface> {
    return this.httpClient.get<MarcacaoInterface>(`${this.url}/${id}`);
  }

  private adicionar(marcacao: MarcacaoInterface)  {
    return this.httpClient.post(this.url, marcacao);
  }

  private atualizar(marcacao: MarcacaoInterface) {
    return this.httpClient.put(`${this.url}/${marcacao.id}`, marcacao);
  }

  salvar(marcacao: MarcacaoInterface) {
    if(marcacao.id) {
      return this.atualizar(marcacao);
    } else {
      return this.adicionar(marcacao);
    }
  }
}

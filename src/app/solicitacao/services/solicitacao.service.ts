import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitacaoInterface } from '../types/solicitacao.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private url = 'http://localhost:3000/solicitacoes';

  constructor(
    private httpClient: HttpClient
  ) {}

  getMarcacoes(): Observable<SolicitacaoInterface[]> {
    return this.httpClient.get<SolicitacaoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getSolicitacao(id: number): Observable<SolicitacaoInterface> {
    return this.httpClient.get<SolicitacaoInterface>(`${this.url}/${id}`);
  }

  private adicionar(solicitacao: SolicitacaoInterface)  {
    return this.httpClient.post(this.url, solicitacao);
  }

  private atualizar(solicitacao: SolicitacaoInterface) {
    return this.httpClient.put(`${this.url}/${solicitacao.id}`, solicitacao);
  }

  salvar(solicitacao: SolicitacaoInterface) {
    if(solicitacao.id) {
      return this.atualizar(solicitacao);
    } else {
      return this.adicionar(solicitacao);
    }
  }
}

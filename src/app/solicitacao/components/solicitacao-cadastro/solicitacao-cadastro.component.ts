import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SolicitacaoInterface } from '../../types/solicitacao.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { TipoSolicitacaoEnum } from '../../types/tipo-solicitacao.enum';
import { StatusEnum } from '../../types/status.enum';
import { MarcacaoInterface } from 'src/app/marcacao/types/marcacao.interface';
import { MarcacaoService } from 'src/app/marcacao/services/marcacao.service';

@Component({
  selector: 'app-solicitacao-cadastro',
  templateUrl: './solicitacao-cadastro.component.html',
  styleUrls: ['./solicitacao-cadastro.component.scss'],
})
export class SolicitacaoCadastroComponent implements OnInit {
  solicitacaoId: number | null;
  solicitacaoForm: FormGroup;
  TipoSolicitacaoEnum = TipoSolicitacaoEnum;
  marcacoes: MarcacaoInterface[] = [];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private marcacaoService: MarcacaoService,
    private router: Router
  ) {
    this.solicitacaoId = null;
    this.solicitacaoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.solicitacaoId = parseInt(id);
      this.solicitacaoService
        .getSolicitacao(this.solicitacaoId)
        .subscribe((solicitacao) => {
          this.solicitacaoForm = this.createForm(solicitacao);
        });
    } 
    this.marcacaoService.getMarcacoes().subscribe(
      (id) => {
        console.log('Dados das Marcações:', id);
        this.marcacoes = id;
      },
      (error) => {
        console.error('Erro ao carregar as marcações', error);
      }
    );
  }

  private createForm(solicitacao?: SolicitacaoInterface) {
    return new FormGroup({
      nome: new FormControl(solicitacao?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      justificativa: new FormControl(solicitacao?.justificativa || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      data: new FormControl(solicitacao?.data),
      tipoSolicitacao: new FormControl(
        solicitacao?.tipoSolicitacao || TipoSolicitacaoEnum.INCLUSAO,
        Validators.required
      ),
      idMarcacao: new FormControl(solicitacao?.idMarcacao || null, Validators.required),
    });
  }

  salvar() {
    const solicitacao: SolicitacaoInterface = {
      ...this.solicitacaoForm.value,
      id: this.solicitacaoId,
      status: StatusEnum.PENDENTE,
    };
    this.solicitacaoService.salvar(solicitacao).subscribe(
      () => {
        this.router.navigate(['/tabs/solicitacao']);
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a solicitação ${solicitacao.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.solicitacaoForm.get('nome');
  }

  get justificativa() {
    return this.solicitacaoForm.get('justificativa');
  }

  get tipoSolicitacao() {
    return this.solicitacaoForm.get('tipoSolicitacao');
  }

  get idMarcacao() {
    return this.solicitacaoForm.get('idMarcacao');
  }

  formatarData(data: Date): string {
    const dataObj = new Date(data);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(dataObj);
    return dataFormatada;
  }

  isAlteracaoOuExclusao(): boolean {
    const tipoSolicitacaoControl = this.solicitacaoForm.get('tipoSolicitacao');

    if (tipoSolicitacaoControl) {
      const tipoSolicitacao = tipoSolicitacaoControl.value;
      return tipoSolicitacao === TipoSolicitacaoEnum.ALTERACAO || tipoSolicitacao === TipoSolicitacaoEnum.EXCLUSAO;
    }
    return false;
  }
}

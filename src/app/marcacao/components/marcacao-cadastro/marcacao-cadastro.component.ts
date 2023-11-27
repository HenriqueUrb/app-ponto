import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MarcacaoInterface } from '../../types/marcacao.interface';
import { MarcacaoService } from '../../services/marcacao.service';
import { TipoEnum } from '../../types/tipo.enum';

@Component({
  selector: 'app-marcacao-cadastro',
  templateUrl: './marcacao-cadastro.component.html',
  styleUrls: ['./marcacao-cadastro.component.scss'],
})
export class MarcacaoCadastroComponent implements OnInit {
  marcacaoId: number | null;
  marcacaoForm: FormGroup;


  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private marcacaoService: MarcacaoService,
    private router: Router
  ) {
    this.marcacaoId = null;
    this.marcacaoForm = this.createForm();
  }

  ngOnInit() {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.marcacaoId = parseInt(id);
        this.marcacaoService.getMarcacao(this.marcacaoId).subscribe((marcacao) => {
          this.marcacaoForm = this.createForm(marcacao);
        })
      }
  }

  private createForm(marcacao?: MarcacaoInterface) {
    return new FormGroup({
      nome: new FormControl(marcacao?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      data: new FormControl(marcacao?.data, { validators: this.validateDate.bind(this) }), 
      tipo: new FormControl(
        marcacao?.tipo || TipoEnum.NORMAL,
        Validators.required
      ),
    });
  }

  salvar() {
    const marcacao: MarcacaoInterface = {
      ...this.marcacaoForm.value,
      id: this.marcacaoId,
    };
    this.marcacaoService.salvar(marcacao).subscribe(
      () => {
        this.router.navigate(['/tabs/marcacao']);
      },
        (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a marcação ${marcacao.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome(){
    return this.marcacaoForm.get('nome');
  }

  get data(){
    return this.marcacaoForm.get('data');
  }

  private validateDate(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const dataAtual = new Date();
  
    if (
      selectedDate.getDate() !== dataAtual.getDate() ||
      selectedDate.getMonth() !== dataAtual.getMonth() ||
      selectedDate.getFullYear() !== dataAtual.getFullYear()
    ) {
      return { invalidDate: true };
    }
  
    return null;
  }
}

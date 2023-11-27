import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AtestadoInterface } from '../../types/atestado.interface';
import { AtestadoService } from '../../services/atestado.service';

@Component({
  selector: 'app-atestado-cadastro',
  templateUrl: './atestado-cadastro.component.html',
  styleUrls: ['./atestado-cadastro.component.scss'],
})
export class AtestadoCadastroComponent {
  atestadoId: number | null;
  atestadoForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private atestadoService: AtestadoService,
    private router: Router
  ) {
    this.atestadoId = null;
    this.atestadoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.atestadoId = parseInt(id);
      this.atestadoService
        .getAtestado(this.atestadoId)
        .subscribe((atestado) => {
          this.atestadoForm = this.createForm(atestado);
        });
    }
  }

  private createForm(atestado?: AtestadoInterface) {
    return new FormGroup({
      nome: new FormControl(atestado?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      data: new FormControl(atestado?.data, Validators.required),
      duracao: new FormControl(atestado?.duracao || '', Validators.required),
      local: new FormControl(atestado?.local || '', Validators.required),
      arquivo: new FormControl(atestado?.arquivo, Validators.required),
    });
  }

  salvar() {
    const atestado: AtestadoInterface = {
      ...this.atestadoForm.value,
      id: this.atestadoId,
    };
    this.atestadoService.salvar(atestado).subscribe(
      () => {
        this.router.navigate(['/tabs/atestado']);
      },
        (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a atestado  ${atestado.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome(){
    return this.atestadoForm.get('nome');
  }

  get data(){
    return this.atestadoForm.get('data');
  }
}

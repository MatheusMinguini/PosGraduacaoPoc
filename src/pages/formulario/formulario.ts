import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Cliente } from '../../models/Cliente';
import { ConfiguracaoService } from '../../config/config.service';
import { ConfiguracaoMensagem } from '../../config/config.messages';
import { Http } from '@angular/http';


@Component({
    providers : [Cliente, ConfiguracaoService, ConfiguracaoMensagem],
    selector : 'formulario',
    templateUrl : 'formulario.html'
})

export class Formulario implements OnInit{

  public cliente : Cliente = new Cliente;

  myColor: string;
  isRound: boolean;

  public nomeValido: boolean  = false;
  
  constructor(public parametro : NavParams,
      public _navController : NavController,
      public _alert : AlertController,
      private _loadingCtrl: LoadingController,
      public _http: Http, 
      public _configuracaoMensagem: ConfiguracaoMensagem,
      public _configuracaoService: ConfiguracaoService){

  }

  ngOnInit(){
    this.myColor = 'search-buttom';
    this.isRound = false;
  }

  salvar(){
    if(this.cliente.verificarCamposObrigatorios(this.cliente)){
      
    }else{
        this._configuracaoMensagem.mostrarMensagemCamposObrigatorios(this);

        let array = this.getCamposVazios();

        this.limparCorCampos();

        array.forEach(element => {
            element.setAttribute("style", "color: #f53d3d");
        });
    }
  }

  getCamposVazios(){
    let arr : any = [];

    if(!this.cliente.nome)
        arr.push(document.querySelector('#nome'));

    if(!this.cliente.sobrenome)
        arr.push(document.querySelector('#sobrenome'));

    if(!this.cliente.celular)
        arr.push(document.querySelector('#celular'));

    if(!this.cliente.email)
        arr.push(document.querySelector('#email'));

    if(!this.cliente.sexo)
        arr.push(document.querySelector('#sexo'));

    if(!this.cliente.data_nascimento)
        arr.push(document.querySelector('#data_nascimento'));


     return arr;

  }

  limparCorCampos(){
    debugger;
    document.querySelector('#nome').setAttribute("style", "color: #0084b4");
    document.querySelector('#sobrenome').setAttribute("style", "color: #0084b4");
    document.querySelector('#celular').setAttribute("style", "color: #0084b4");
    document.querySelector('#email').setAttribute("style", "color: #0084b4");
    document.querySelector('#sexo').setAttribute("style", "color:#0084b4");
    document.querySelector('#data_nascimento').setAttribute("style", "color:#0084b4");
  }

  verificarDuplicidadeNome(){

    if(!this.cliente.nome && !this.cliente.sobrenome) {
      this._alert.create({
        title : 'Dados vazios',
        buttons : [{ text : "Entendi"}],
        subTitle : 'Por favor, informe o nome'
      }).present();
    }else{
        const loader = this._loadingCtrl.create({
          content : "Verificando nome, aguarde"
        });

      loader.present();

      this._http.get(this._configuracaoService.getAdressAPI() + `/verificaDuplicidadeNome?nome=${this.cliente.nome}&sobrenome=${this.cliente.sobrenome}`)
      .map(resp => resp.json())
        .toPromise()
          .then(elemento => {
            loader.dismiss();

            if (typeof elemento == 'undefined' || elemento.length == 0) {
              this.nomeValido = true;
            }else{
              this._alert.create(
              {
                title : 'Nome Existente',
                buttons : [{ text : "Tudo bem"}],
                subTitle : 'Verificamos e, já existe um produto com esse nome'
              }).present();
            }

          }).catch (erro => {
            loader.dismiss();
            this._alert.create(
              {
                title : 'Erro',
                buttons : [{ text : "Tudo bem", handler : () => {this._navController.setRoot(HomePage)} }],
                subTitle : 'Houve um erro ao consultar o nome, tente mais tarde'
              }
            ).present();
          });
    }
  }
}

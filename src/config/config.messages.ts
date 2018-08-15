export class ConfiguracaoMensagem {
    public _mensagemLoading : string;

    public _falhaConexaoTitulo : string;
    public _falhaConexaoMensagem : string;

    public _sucessoOperacaoTitulo : string;
    public _sucessoOperacaoMensagem : string;

    public _falhaOperacaoTitulo: string;
    public _falhaOperacaoMensagem : string;
  
    constructor(){
      this._mensagemLoading = 'Buscando clientes recentementes cadastrados';
      this._falhaConexaoTitulo = 'Falha na conex�o';
      this._falhaConexaoMensagem = 'N�o foi poss�vel obter os dados, verifique a sua internet';

      this._sucessoOperacaoTitulo = 'Sucesso';
      this._sucessoOperacaoMensagem = 'Opera��o realizada com sucesso';
      this._falhaOperacaoTitulo = 'Ocorreu um problema no servidor, estamos trabalhando pra resolver';
      this._falhaOperacaoMensagem = 'Ocorreu um problema no servidor, estamos trabalhando pra resolver';
    }

    
    getMensagemLoading() : string{
        return this._mensagemLoading;
    }
    getFalhaConexaoTitulo() : string{
        return this._falhaConexaoTitulo;
    }
    getFalhaConexaoMensagem() : string{
        return this._falhaConexaoMensagem;
    }
    getSucessoOperacaoTitulo() : string{
        return this._sucessoOperacaoTitulo;
    }
    getSucessoOperacaoMensagem() : string{
        return this._sucessoOperacaoMensagem;
    }
    getFalhaOperacaoTitulo() : string{
        return this._falhaOperacaoTitulo;
    }
    getFalhaOperacaoMensagem() : string{
        return this._falhaOperacaoMensagem;
    }

    confirmarOperacao(objeto, cliente) {
        let alert = objeto._alertCtrl.create({
          title: 'Confirma��o',
          message: 'Voc� deseja realmente realizar essa opera��o?',
          buttons: [
            {
              text: 'N�o',
              role: 'cancel'
            },
            {
              text: 'Sim',
              handler: () => {
                objeto.remover(cliente);
              }
            }
          ]
        });
        alert.present();
    }

    mostrarMensagemCamposObrigatorios(objeto) {
        objeto._alertCtrl.create({
            title : 'Campos obrigat�rios',
            subTitle : 'Por favor, preencha todos os campos em vermelho',
            buttons : [{ text: 'Entendi'}]
        }).present();
    }
  }
  
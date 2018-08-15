export class Cliente{
    nome: String;
    sobrenome : String;
    email: String;
    data_nascimento: Date;
    celular : number;
    telefone_fixo : String;
    sexo : String;
    img: string;
  
    constructor(){
  
    }
  
    verificarCamposObrigatorios(objeto){
      if(!objeto.nome || !objeto.descricao || !objeto.preco || !objeto.cor || !objeto.tamanho
        || !objeto.grupo_id || !objeto.genero && !objeto.sexo){
          return false;
      }else{
          return true;
      }
    }
  
    verificarFiltros(objeto){
      if(!objeto.nome && !objeto.preco && !objeto.cor && !objeto.tamanho
        && !objeto.grupo_id && !objeto.genero && !objeto.data_cadastro && !objeto.sexo){
          return false;
      }else{
          return true;
      }
    }
  }
  
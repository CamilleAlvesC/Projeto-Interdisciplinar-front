// Inicio.js
import { useAuth } from "../componentes/Auth";
import InicioUsuario from "./usuario/InicioUsuario.jsx";
import PessoaCoordenador from "./coordenador/visao/PessoaCoordenador.jsx";
import InicioSecretaria from "./secretaria/InicioSecretaria.jsx";
import env from "/env.js";

const Inicio = () => {

  //ESSA É A VAR QUE TEM O LOCALSTORAGE.. RECUPERAMOS ELA NO CONTEXTO..
  const user = useAuth();

  //com o dado eu posso saber se é adm ou não e mudar o painel..
  //PAINEL USUARIO
  if (user.adm == 0) {
    
    return (
      <InicioUsuario />
    );

  }

  //PAINEL ADM
  if(user.adm == 1){

    return (
      <PessoaCoordenador />
    )

  }

  //PAINEL SECRETARIA
  if(user.email == env.credentials.master.email){

    return (
      <InicioSecretaria />
    )

  }

    
};

export default Inicio;

import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//o UseContext no React é usado para não precisar ficar usando o useState toda hora...

const AuthContext = createContext(null);//aqui ele cria um contexto vazio DE COMEÇO..

//essa função é pra retornar o valor do contexto quando ter um componente cercado por ele..
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  //se for uma rota que não tem o contexto, e a pessoa tenta usar essa função, ele manda esse erro..
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

//essa função é usada pra cercar e atribuir valor ao createContext
//os componentes que usam os dados do user, vai em ../App.jsx,
//lá tem as rotas que precisam de dados de usuarios, e que devem ter usuario autenticados e outras que não..
export const AuthProvider = ({ children }) => {
  const [useDadosUsuario, setDadosUsuario] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  
  //aqui ele vai fazer a verificação se tem vaalor no localstorage...
  useEffect(() => {
    const usuarioLocalStorage = localStorage.getItem('usuario');
    
    //se ter ele vai atribuir o valor em usuarioLocalStorage pra gente conseguir pegar com o useAuth()..
    if (usuarioLocalStorage) {

      setDadosUsuario(JSON.parse(usuarioLocalStorage));
      
    } else {//se não ele joga o usuario pra o login de novo, ele n tem acesso a essa rota..

      navigate("/login");
    }

    setLoading(false);//o carregar para pois o useEffect acabou..
  }, [navigate]);

  
  //como esse context esta usando useEffect ele tem um delay p carregar, e se n colocar esse "Carregando" antes dele recuperar os dados, ele retorna erro..
  if (loading) {
    return <div>Carregando...</div>; 
  }

  //retorna o contexto com seu "Provedor" diretamente, e adiciona o valor q estavamos buscando no localstorage nele, q ja esta adiconado.. (useDadosUsuario)
  return (
    <AuthContext.Provider value={useDadosUsuario}>
      {children}
    </AuthContext.Provider>
  );
};

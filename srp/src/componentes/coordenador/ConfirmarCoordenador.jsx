import env from "/env.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoSol from "../../img/Sun (1).png";

export default function ConfirmarCoordenador() {
    const [usePassword, setPassword] = useState('');
    const [useMensagem, setMensagem] = useState('');

    const navigate = useNavigate();

    function verifyIdentity(e){
        
        e.preventDefault();

        if (usePassword !== env.credentials.master.password) {
            setMensagem("Senha inválida.");
            return;
        }else{
            return navigate("/cadastro/coordenador", { state: { pass: usePassword } });
        }

    }

    return (

        <div className="auth-container">
            <div className="top">
                <div className="logo-form">
                    <img src={logoSol} alt="Logo" />
                </div>
                <h2>É você mesmo?</h2>
                <p>Para se registrar como coordenador escreva a senha que a secretária te passou.</p>
            </div>

            {useMensagem && <p className="mensagem">{useMensagem}</p>}

            <form onSubmit={verifyIdentity} className='form-login'>
                <div className="input-group">
                    <label>Senha:</label>
                    <input
                    type="password"
                    value={usePassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Digite a senha aqui"
                    />
                </div>
                <button type="submit">
                    Verificar
                </button>
            </form>
        </div>

    )

}
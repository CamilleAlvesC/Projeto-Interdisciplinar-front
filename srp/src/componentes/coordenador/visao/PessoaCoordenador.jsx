import { useEffect, useState } from "react";
import Header from "../../utilizavel/Header";
import Modal from "../../utilizavel/Modal";
import DataTable from "../../utilizavel/DataTable";
import Card from "../../utilizavel/Card";

import  "../../../styles/modelo_crud.css";
import env from "/env.js";

export default function PessoaCoordenador() {
    const [useUsers, setUsers] = useState([]);// todos os usuarios
    const [useSingleUser, setUseSingleUser] = useState(null);//id de um usuário selecionado (para requisições q precisam de id)

    const [useLoading, setLoading] = useState(false);
    
    const [useModalEdit, setModalEdit] = useState(false);
    const [useModalDelete, setModalDelete] = useState(false);
    const [useModalNewUser, setModalNewUser] = useState(false);
    
    useEffect(() => {
        setLoading(true);

        fetchAllUsers();
    }, []);

    // Função que recupera a lista de usuários
    async function fetchAllUsers() {
        const response = await fetch(env.url.local + '/user/', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
            setUsers(data);
        } else {
            console.error("A resposta não é um array válido", data);
        }
        setLoading(false);
    }

    // Função para enviar o update do usuário
    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const updatedUser = {
            id: useSingleUser.id,
            nome: useSingleUser.nome,
            email: useSingleUser.email,
            senha: useSingleUser.senha,
            rua: useSingleUser.rua,
            bairro: useSingleUser.bairro,
            cidade: useSingleUser.cidade,
            cpf: useSingleUser.cpf,
            rg: useSingleUser.rg,
            telefone: useSingleUser.telefone,
            adm: useSingleUser.adm,
            id_paroquia: useSingleUser.id_paroquia,
        };

        await fetch(env.url.local + `/user/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        setModalEdit(false);

        fetchAllUsers();

    };

    const handleNewUser = async (e) => {
        e.preventDefault();

        const registeredUser = {
            id: useSingleUser.id,
            nome: useSingleUser.nome,
            email: useSingleUser.email,
            senha: useSingleUser.senha,
            rua: useSingleUser.rua,
            bairro: useSingleUser.bairro,
            cidade: useSingleUser.cidade,
            cpf: useSingleUser.cpf,
            rg: useSingleUser.rg,
            telefone: useSingleUser.telefone,
            adm: 0,
            id_paroquia: "",
        };

        await fetch(env.url.local + `/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registeredUser)
        });

        setModalNewUser(false);
        setUseSingleUser([{}]);

        fetchAllUsers();

    }

    const handleDeleteUser = async () => {

        await fetch(env.url.local + `/user/delete/` + useSingleUser.id, {
            method: 'DELETE'
        });
        setModalDelete(false);
        fetchAllUsers();
    };

    if (useLoading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div>

            <Modal isOpen={useModalEdit} closeModal={() => setModalEdit(false)}>
                <form onSubmit={handleUpdateUser}>
                    <h2>Editar Usuário</h2>
                    <label>Nome:</label>
                    <input type="text" value={useSingleUser?.nome || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, nome: e.target.value })} />
                    
                    <label>Email:</label>
                    <input type="email" value={useSingleUser?.email || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, email: e.target.value })} />

                    <label>Rua:</label>
                    <input type="text" value={useSingleUser?.rua || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, rua: e.target.value })} />
                    
                    <label>Bairro:</label>
                    <input type="text" value={useSingleUser?.bairro || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, bairro: e.target.value })} />
                    
                    <label>Cidade:</label>
                    <input type="text" value={useSingleUser?.cidade || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, cidade: e.target.value })} />

                    <label>CPF:</label>
                    <input type="text" value={useSingleUser?.cpf || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, cpf: e.target.value })} />

                    <label>RG:</label>
                    <input type="text" value={useSingleUser?.rg || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, rg: e.target.value })} />

                    <label>Telefone:</label>
                    <input type="text" value={useSingleUser?.telefone || ''} onChange={(e) => setUseSingleUser({ ...useSingleUser, telefone: e.target.value })} />

                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalEdit(false)}>Cancelar</button>
                </form>
            </Modal>

            <Modal isOpen={useModalDelete} closeModal={() => setModalDelete(false)}>
                <div>
                    <h2>Excluir Usuário</h2>
                    <p>Tem certeza de que deseja excluir este usuário?</p>
                    <button onClick={() => handleDeleteUser()}>Sim, excluir</button>
                    <button onClick={() => setModalDelete(false)}>Cancelar</button>
                </div>
            </Modal>

            <Modal isOpen={useModalNewUser} closeModal={() => setModalNewUser(false)}>
                <form onSubmit={handleNewUser}>
                    <h2>Cadastrar Usuário</h2>
                    <label>Nome:</label>
                    <input type="text" onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, nome: e.target.value }); }} />
                    
                    <label>Email:</label>
                    <input type="email" onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, email: e.target.value }); }} />

                    <label>Senha:</label>
                    <input type="password" onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, senha: e.target.value }); }} />

                    <label>Rua:</label>
                    <input type="text"  onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, rua: e.target.value }); }} />
                    
                    <label>Bairro:</label>
                    <input type="text"  onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, bairro: e.target.value }); }} />
                    
                    <label>Cidade:</label>
                    <input type="text"  onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, cidade: e.target.value }); }} />

                    <label>CPF:</label>
                    <input type="text"  onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, cpf: e.target.value }); }} />

                    <label>RG:</label>
                    <input type="text" onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, rg: e.target.value }); }} />

                    <label>Telefone:</label>
                    <input type="text"  onChange={(e) => { setUseSingleUser([]); setUseSingleUser({ ...useSingleUser, telefone: e.target.value })}} />

                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalNewUser(false)}>Cancelar</button>
                </form>
            </Modal>

            <Header className="header" which="coordenador" />

            <DataTable 
                data={useUsers} 
                columns={    
                    [
                        { header: "ID", accessor: "id" },
                        { header: "Nome", accessor: "nome" },
                        { header: "Email", accessor: "email" },
                        { header: "CPF", accessor: "cpf" },
                        { header: "RG", accessor: "rg" },
                        { header: "Cidade", accessor: "cidade" }
                    ]
                } 
                eventEditButton={(item) => { 
                    setModalEdit(true); 
                    setUseSingleUser(item); 
                }} 
                eventDelButton={(item) => { 
                    setModalDelete(true); 
                    setUseSingleUser(item);
                }}
                searchField={'cpf'}
                itemsPerPage={5}
            />

            <div className="cards-bottom">

                <Card width={'100%'} height={'auto'} 

                    childrenTop={(
                        <div>
                            <span className="new-user-top-span">
                                <h2>Novo Usuário</h2>
                                <svg width={25} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 14h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zM18 17c-.553 0-1-.448-1-1v-6c0-.552.447-1 1-1s1 .448 1 1v6c0 .552-.447 1-1 1zM9 6c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3m0-2c-2.764 0-5 2.238-5 5s2.236 5 5 5 5-2.238 5-5-2.236-5-5-5zM9 17c2.021 0 3.301.771 3.783 1.445-.683.26-1.969.555-3.783.555-1.984 0-3.206-.305-3.818-.542.459-.715 1.777-1.458 3.818-1.458m0-2c-3.75 0-6 2-6 4 0 1 2.25 2 6 2 3.518 0 6-1 6-2 0-2-2.354-4-6-4z"></path></svg>    
                            </span>
                        </div>
                    )}

                    childrenBottom={(
                        <span>
                            <p style={{marginBottom: 12}}>Registre um novo usuário comum SRP.</p>
                            <button onClick={() => setModalNewUser(true)}>Criar</button>
                        </span>
                    )} 

                />

            </div>

        </div>
    );
}
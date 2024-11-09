import { useEffect, useState } from "react";
import Header from "../../utilizavel/Header";
import Modal from "../../utilizavel/Modal";
import DataTable from "../../utilizavel/DataTable";
import Card from "../../utilizavel/Card";
import "../../../styles/modelo_crud.css";
import env from "/env.js";

export default function OnibusCoordenador() {
    const [useBus, setBus] = useState([]); // todos os usuários
    const [useSingleBus, setUseSingleBus] = useState({}); // dados de um ônibus selecionado

    const [useLoading, setLoading] = useState(false);
    
    const [useModalEdit, setModalEdit] = useState(false);
    const [useModalDelete, setModalDelete] = useState(false);
    const [useModalNewBus, setModalNewBus] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetchAllBuss();
    }, []);

    // Função que recupera a lista de ônibus
    async function fetchAllBuss() {
        const response = await fetch(env.url.local + '/bus/', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (Array.isArray(data.data)) {
            setBus(data.data);
        } else {
            console.error("A resposta não é um array válido", data.data);
        }
        setLoading(false);
    }

    // Função para enviar o update do ônibus
    const handleUpdateBus = async (e) => {
        e.preventDefault();

        const updatedBus = {
            id: useSingleBus.id,
            numero: useSingleBus.numero,
            placa_onibus: useSingleBus.placa_onibus
        };

        await fetch(env.url.local + `/bus/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBus)
        });

        setModalEdit(false);
        fetchAllBuss();
    };

    const handleNewBus = async (e) => {
        e.preventDefault();

        const registeredBus = {
            numero: useSingleBus.numero,
            placa_onibus: useSingleBus.placa_onibus
        };

        await fetch(env.url.local + `/bus/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registeredBus)
        });

        setModalNewBus(false);
        setUseSingleBus({});

        fetchAllBuss();
    };

    const handleDeleteBus = async () => {
        await fetch(env.url.local + `/bus/delete/` + useSingleBus.id, {
            method: 'DELETE'
        });
        setModalDelete(false);
        fetchAllBuss();
    };

    if (useLoading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div>
            <Modal isOpen={useModalEdit} closeModal={() => setModalEdit(false)}>
                <form onSubmit={handleUpdateBus}>
                    <h2>Editar ônibus</h2>
                    <label>Placa do Ônibus:</label>
                    <input 
                        type="text" 
                        value={useSingleBus.placa_onibus || ""} 
                        onChange={(e) => setUseSingleBus({ ...useSingleBus, placa_onibus: e.target.value })} 
                    />
                    
                    <label>Número:</label>
                    <input 
                        type="text" 
                        value={useSingleBus.numero || ""} 
                        onChange={(e) => setUseSingleBus({ ...useSingleBus, numero: e.target.value })} 
                    />

                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalEdit(false)}>Cancelar</button>
                </form>
            </Modal>

            <Modal isOpen={useModalDelete} closeModal={() => setModalDelete(false)}>
                <div>
                    <h2>Excluir ônibus</h2>
                    <p>Tem certeza de que deseja excluir este ônibus?</p>
                    <button onClick={() => handleDeleteBus()}>Sim, excluir</button>
                    <button onClick={() => setModalDelete(false)}>Cancelar</button>
                </div>
            </Modal>

            <Modal isOpen={useModalNewBus} closeModal={() => setModalNewBus(false)}>
                <form onSubmit={handleNewBus}>
                    <h2>Cadastrar ônibus</h2>
                    <label>Placa do Ônibus:</label>
                    <input 
                        type="text" 
                        value={useSingleBus.placa_onibus || ""} 
                        onChange={(e) => setUseSingleBus({ ...useSingleBus, placa_onibus: e.target.value })} 
                    />
                    
                    <label>Número:</label>
                    <input 
                        type="text" 
                        value={useSingleBus.numero || ""} 
                        onChange={(e) => setUseSingleBus({ ...useSingleBus, numero: e.target.value })} 
                    />

                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalNewBus(false)}>Cancelar</button>
                </form>
            </Modal>

            <Header className="header" which="coordenador" />

            <DataTable 
                data={useBus} 
                columns={[    
                    { header: "ID", accessor: "id" },
                    { header: "Placa", accessor: "placa_onibus" },
                    { header: "Número", accessor: "numero" }
                ]} 
                eventEditButton={(item) => { 
                    setModalEdit(true); 
                    setUseSingleBus(item); 
                }} 
                eventDelButton={(item) => { 
                    setModalDelete(true); 
                    setUseSingleBus(item);
                }}
                searchField={'placa_onibus'}
                itemsPerPage={5}
            />

            <div className="cards-bottom">
                <Card width={'100%'} height={'auto'} 
                    childrenTop={(
                        <div>
                            <span className="new-bus-top-span">
                                <h2>Novo ônibus</h2>
                                <svg width={25} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 14h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zM18 17c-.553 0-1-.448-1-1v-6c0-.552.447-1 1-1s1 .448 1 1v6c0 .552-.447 1-1 1zM9 6c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3m0-2c-2.764 0-5 2.238-5 5s2.236 5 5 5 5-2.238 5-5-2.236-5-5-5zM9 17c2.021 0 3.301.771 3.783 1.445-.683.26-1.969.555-3.783.555-1.984 0-3.206-.305-3.818-.542.459-.715 1.777-1.458 3.818-1.458m0-2c-3.75 0-6 2-6 4 0 1 2.25 2 6 2 3.518 0 6-1 6-2 0-2-2.354-4-6-4z"></path></svg>    
                            </span>
                        </div>
                    )}
                    childrenBottom={(
                        <span>
                            <p style={{marginBottom: 12}}>Registre um novo ônibus.</p>
                            <button onClick={() => {setUseSingleBus([{}]); setModalNewBus(true);}}>Criar</button>
                        </span>
                    )}
                />
            </div>
        </div>
    );
}
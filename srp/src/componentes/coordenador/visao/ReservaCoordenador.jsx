import { useEffect, useState } from "react";
import Header from "../../utilizavel/Header";
import Modal from "../../utilizavel/Modal";
import DataTable from "../../utilizavel/DataTable";
import Card from "../../utilizavel/Card";
import "../../../styles/modelo_crud.css";
import env from "/env.js";

export default function ReservaCoordenador() {
    const [reservations, setReservations] = useState([]); // all reservations
    const [singleReservation, setSingleReservation] = useState({}); // selected reservation data

    const [loading, setLoading] = useState(false);
    
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalNewReservation, setModalNewReservation] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        fetchAllReservations();
    }, []);

    // Fetch all reservations
    async function fetchAllReservations() {
        const response = await fetch(env.url.local + '/reservation/', {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (Array.isArray(data.data)) {
            setReservations(data.data);
        } else {
            console.error("Response is not a valid array", data.data);
        }
        setLoading(false);
    }

    // Handle updating a reservation
    const handleUpdateReservation = async (e) => {
        e.preventDefault();

        const updatedReservation = {
            id: singleReservation.id,
            ticket: {
                id_usuario: singleReservation.ticket.id_usuario,
                quantidade: singleReservation.ticket.quantidade,
                preco: singleReservation.ticket.preco
            },
            travel: {
                id_paroquia: singleReservation.travel.id_paroquia,
                id_onibus: singleReservation.travel.id_onibus,
                data_partida: singleReservation.travel.data_partida
            }
        };

        await fetch(env.url.local + `/reservation/edit/${singleReservation.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedReservation)
        });

        setModalEdit(false);
        fetchAllReservations();
    };

    // Handle creating a new reservation
    const handleNewReservation = async (e) => {
        e.preventDefault();

        const newReservation = {
            ticket: {
                id_usuario: singleReservation.ticket.id_usuario,
                quantidade: singleReservation.ticket.quantidade,
                preco: singleReservation.ticket.preco
            },
            travel: {
                id_paroquia: singleReservation.travel.id_paroquia,
                id_onibus: singleReservation.travel.id_onibus,
                data_partida: singleReservation.travel.data_partida
            }
        };

        await fetch(env.url.local + '/reservation/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReservation)
        });

        setModalNewReservation(false);
        setSingleReservation({});
        fetchAllReservations();
    };

    // Handle deleting a reservation
    const handleDeleteReservation = async () => {
        await fetch(env.url.local + `/reservation/delete/${singleReservation.id}`, {
            method: 'DELETE'
        });
        setModalDelete(false);
        fetchAllReservations();
    };

    if (loading) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div>
            {/* Edit Modal */}
            <Modal isOpen={modalEdit} closeModal={() => setModalEdit(false)}>
                <form onSubmit={handleUpdateReservation}>
                    <h2>Editar Reserva</h2>
                    <label>Usuário:</label>
                    <input 
                        type="text" 
                        value={singleReservation.ticket?.id_usuario || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            ticket: { ...singleReservation.ticket, id_usuario: e.target.value }
                        })} 
                    />
                    
                    <label>Quantidade:</label>
                    <input 
                        type="number" 
                        value={singleReservation.ticket?.quantidade || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            ticket: { ...singleReservation.ticket, quantidade: e.target.value }
                        })} 
                    />
                    
                    <label>Preço:</label>
                    <input 
                        type="number" 
                        value={singleReservation.ticket?.preco || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            ticket: { ...singleReservation.ticket, preco: e.target.value }
                        })} 
                    />

                    <label>Data de Partida:</label>
                    <input 
                        type="datetime-local" 
                        value={singleReservation.travel?.data_partida || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            travel: { ...singleReservation.travel, data_partida: e.target.value }
                        })} 
                    />

                    <button type="submit">Salvar Alterações</button>
                    <button type="button" onClick={() => setModalEdit(false)}>Cancelar</button>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={modalDelete} closeModal={() => setModalDelete(false)}>
                <div>
                    <h2>Excluir Reserva</h2>
                    <p>Tem certeza de que deseja excluir esta reserva?</p>
                    <button onClick={() => handleDeleteReservation()}>Sim, excluir</button>
                    <button onClick={() => setModalDelete(false)}>Cancelar</button>
                </div>
            </Modal>

            {/* New Reservation Modal */}
            <Modal isOpen={modalNewReservation} closeModal={() => setModalNewReservation(false)}>
                <form onSubmit={handleNewReservation}>
                    <h2>Cadastrar Reserva</h2>
                    <label>Usuário:</label>
                    <input 
                        type="text" 
                        value={singleReservation.ticket?.id_usuario || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            ticket: { ...singleReservation.ticket, id_usuario: e.target.value }
                        })} 
                    />
                    
                    <label>Quantidade:</label>
                    <input 
                        type="number" 
                        value={singleReservation.ticket?.quantidade || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            ticket: { ...singleReservation.ticket, quantidade: e.target.value }
                        })} 
                    />
                    
                    <label>Preço:</label>
                    <input 
                        type="number" 
                        value={singleReservation.ticket?.preco || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            ticket: { ...singleReservation.ticket, preco: e.target.value }
                        })} 
                    />

                    <label>Data de Partida:</label>
                    <input 
                        type="datetime-local" 
                        value={singleReservation.travel?.data_partida || ""} 
                        onChange={(e) => setSingleReservation({ 
                            ...singleReservation, 
                            travel: { ...singleReservation.travel, data_partida: e.target.value }
                        })} 
                    />

                    <button type="submit">Salvar Reserva</button>
                    <button type="button" onClick={() => setModalNewReservation(false)}>Cancelar</button>
                </form>
            </Modal>

            <Header className="header" which="coordenador" />

            <DataTable 
                data={reservations} 
                columns={[
                    { header: "ID do Usuário", accessor: "userId" },
                    { header: "Nome do Usuário", accessor: "userNome" },
                    { header: "Email do Usuário", accessor: "userEmail" },
                    { header: "CPF do Usuário", accessor: "userCpf" },
                    { header: "RG do Usuário", accessor: "userRg" },
                    { header: "Telefone do Usuário", accessor: "userTelefone" },
                    { header: "Nome do Local", accessor: "localNome" },
                    { header: "Rua do Local", accessor: "localRua" },
                    { header: "Bairro do Local", accessor: "localBairro" },
                    { header: "Cidade do Local", accessor: "localCidade" },
                    { header: "ID do Ônibus", accessor: "busId" },
                    { header: "Número do Ônibus", accessor: "busNumero" },
                    { header: "Placa do Ônibus", accessor: "busPlacaOnibus" },
                    { header: "Quantidade de Passagens", accessor: "quantidade" },
                    { header: "Preço da Passagem", accessor: "preco" },
                    { header: "Data de Partida", accessor: "dataPartida" }
                ]} 
                eventEditButton={(item) => { 
                    setModalEdit(true); 
                    setSingleReservation(item); 
                }} 
                eventDelButton={(item) => { 
                    setModalDelete(true); 
                    setSingleReservation(item);
                }}
                searchField={'ticket.id_usuario'}
                itemsPerPage={5}
            />

            <div className="cards-bottom">
                <Card width={'100%'} height={'auto'} 
                    childrenTop={(
                        <div>
                            <span className="new-reservation-top-span">
                                <h2>Nova Reserva</h2>
                            </span>
                        </div>
                    )}
                    childrenBottom={(
                        <span>
                            <p style={{marginBottom: 12}}>Registre uma nova reserva.</p>
                            <button onClick={() => { setSingleReservation({}); setModalNewReservation(true); }}>Criar</button>
                        </span>
                    )}
                />
            </div>
        </div>
    );
}

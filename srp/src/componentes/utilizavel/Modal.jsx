import { useEffect } from 'react';
import '../../styles/modal.css'; // Para os estilos do modal

const Modal = ({ isOpen, closeModal, children }) => {
  // Se o modal não estiver aberto, não exibe nada
  if (!isOpen) return null;

  // Função para fechar o modal ao clicar fora
  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  useEffect(() => {
    // Adiciona o evento de clique fora do modal
    document.addEventListener('click', handleOutsideClick);

    // Limpeza do evento ao desmontar o componente
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
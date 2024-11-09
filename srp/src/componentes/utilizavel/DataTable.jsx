import React, { useState, useEffect } from "react";
import "../../styles/data_table.css";

// Props: data: array de objetos, columns: array de objetos, eventEditButton: function, eventDelButton: function, searchField: string, itemsPerPage: number
function DataTable({ data, columns, eventEditButton, eventDelButton, searchField, itemsPerPage }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        // Atualiza os dados filtrados sempre que o searchTerm mudar
        if (searchTerm) {

            const filtered = data.filter(item => 
                item[searchField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [searchTerm, data, searchField]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when the search term changes
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="table-container">
            <input 
                type="text" 
                className="search-input" 
                placeholder={`Buscar por ${searchField.toUpperCase()}`} 
                value={searchTerm} 
                onChange={handleSearchChange} 
            />
            <div className="scrollable-table" style={{ height: "400px", overflowY: "auto" }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="table-header">{column.header}</th>
                            ))}
                            <th className="table-header">Editar</th>
                            <th className="table-header">Excluir</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {currentData.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>{item[column.accessor]}</td>
                                ))}
                                <td><button onClick={() => eventEditButton(item)}>Editar</button></td>
                                <td><button onClick={() => eventDelButton(item)}>Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>{`Página ${currentPage} de ${totalPages}`}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default DataTable;
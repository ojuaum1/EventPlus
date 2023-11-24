import React from 'react';

//estilizacao
import './TableTp.css';

//imagens
import edtiPen from '../../../Assets/images/edit-pen.svg';
import trashDelete from '../../../Assets/images/trash-delete.svg';

const TableTp = ({ dados, fnDelete = null, fnUpdate = null }) => {
    return (
        <table className='table-data'>

            {/*cabecalho */}

            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Titulo</th> 
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>

            {/*corpo */}
            <tbody>
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row">
                            <td className="table-data__data table-data__data--big">
                                {tp.titulo}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img className="table-data__icon" src={edtiPen} alt="" onClick={() => {fnUpdate(tp.idTipoEvento)} }/>
                            </td>

                            <td className="table-data__data table-data__data--little"
                            
                            >
                                <img 
                                className="table-data__icon" 
                                src={trashDelete} 
                                idtipoevento={tp.idTipoEvento}
                                alt="" 
                                onClick= {(e) => {
                                  fnDelete(e.target.getAttribute(`idtipoevento`))
                                }}
                                />
                            </td>
                        </tr>
                    );
                })}

            </tbody>

        </table>
    );
};

export default TableTp;
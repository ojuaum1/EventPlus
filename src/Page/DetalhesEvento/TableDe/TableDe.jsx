import React from "react";
import "./TableDe.css"

const TableDe = (dadosComent) => {
    
    console.log(dadosComent);
    return (
        <table className='table-data'>

            {/* cabecalho */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">User</th>
                    <th className="table-data__head-title table-data__head-title--little">Comentario</th>
                </tr>
            </thead>
            {/* Corpo */}
            <tbody>
                {/* {dadosComent.map((coment) => (
                    <tr key={coment.id} className="table-data__head-row">
                        <td className="table-data__data table-data__data--little">
                            <p>{coment.usuario.nome}</p>
                        </td>
                        <td className="table-data__data table-data__data--little">
                            <p>{coment.descricao}</p>
                        </td>
                    </tr>
                ))} */}

            </tbody>
        </table>
    );


}

export default TableDe;
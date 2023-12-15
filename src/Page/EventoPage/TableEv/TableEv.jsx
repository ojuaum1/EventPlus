import './TableEv.css';

import TrashImage from '../../../Assets/images/trash-delete.svg';
import PenImage from '../../../Assets/images/edit-pen.svg';

const Table = ({ dados, fnDelete = null, fnUpdate = null }) => {
    return (
        <table className='table-data' id='table'>
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data_head-title table-data_head-title--big">Nome do Evento</th>
                    <th className="table-data_head-title table-data_head-title--big">Descrição</th>
                    <th className="table-data_head-title table-data_head-title--big">Tipo do evento</th>
                    <th className="table-data_head-title table-data_head-title--big">Data do Evento</th>
                    <th className="table-data_head-title table-data_head-title--big">Editar</th>
                    <th className="table-data_head-title table-data_head-title--big">Deletar</th>
                </tr>
            </thead>
            <tbody>
                {dados.map(ev => {
                    return (
                        <tr key={ev.idEvento} className="table-data__head-row">
                            <td className="table-data_data table-data_data--big">
                                {ev.nomeEvento}
                            </td>
                            <td className="table-data_data table-data_data--big">
                                {ev.descricao}
                            </td>
                            <td className="table-data_data table-data_data--big">
                                {ev.tiposEvento.titulo}
                            </td>
                            <td className="table-data_data table-data_data--big">
                                {new Date(ev.dataEvento).toLocaleDateString()}
                            </td>
                            <td className="table-data_data table-data_data--little">
                                <img
                                    onClick={(e) => { fnUpdate(ev.idEvento) }}
                                    className="table-data__icon"
                                    src={PenImage}
                                    alt="Botão de editar tipo do evento, ilustrado por um lápis." />
                            </td>

                            <td className="table-data_data table-data_data--little">
                                <img
                                    onClick={(e) => { fnDelete(ev.idEvento) }}
                                    className="table-data__icon"
                                    src={TrashImage}
                                    alt="Botão de deletar tipo do evento, ilustrado por um lixo." />
                            </td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export default Table;
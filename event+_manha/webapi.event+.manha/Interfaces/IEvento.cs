using webapi.event_.manha.Domains;

namespace webapi.event_.manha.Interfaces
{
    public interface IEvento
    {
        void Cadastrar(Evento evento);

        Evento BuscarPorId(Guid Id);

        void atualizar(Guid id, Evento evento);

        void Deletar(Guid id);
    }
}

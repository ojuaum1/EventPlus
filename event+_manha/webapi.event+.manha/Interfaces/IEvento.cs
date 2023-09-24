using apiweb.eventplus.manha.Domains;

namespace apiweb.eventplus.manha.Interfaces
{
    public interface IEventoRepository
    {
        void Cadastrar(Evento evento);
        void Delete(Guid id);
        List<Evento> Listar();
        Evento BuscarPorId(Guid id);
        void Atualizar(Guid id, Evento evento);
    }
}

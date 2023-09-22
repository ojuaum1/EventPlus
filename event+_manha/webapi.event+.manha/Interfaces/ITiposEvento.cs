using webapi.event_.manha.Domains;

namespace apiweb.eventplus.manha.Interfaces
{
    public interface ITipoEventoRepository
    {
        void Cadastrar(TiposEvento tipoEvento);
        void Delete(Guid id);
        List<TiposEvento> Listar();
        TiposEvento BuscarPorId(Guid id);
        void Atualizar(Guid id, TiposEvento tipoEvento);
    }
}
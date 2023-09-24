using apiweb.eventplus.manha.Domains;

namespace apiweb.eventplus.manha.Interfaces
{
    public interface IPresencaEventoRepository
    {
        void Cadastrar(PresencaEvento presencaEvento);
        void Delete(Guid id);
        List<PresencaEvento> Listar();
        List<PresencaEvento> ListarMinhaPresenca(Guid id);
        void Atualizar(Guid id, PresencaEvento presencaEvento);
    }
}

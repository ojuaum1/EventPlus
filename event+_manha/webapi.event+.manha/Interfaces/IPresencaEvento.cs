using apiweb.eventplus.manha.Domains;
using webapi.event_.manha.Domains;

namespace webapi.event_.manha.Interfaces
{
    public interface IPresencaEvento
    {
        void Delete(Guid id);
        List<PresencaEvento> Listar();
        PresencaEvento BuscarPorId(Guid id);
        void Atualizar(Guid id, PresencaEvento presencaEvento);
    }
}

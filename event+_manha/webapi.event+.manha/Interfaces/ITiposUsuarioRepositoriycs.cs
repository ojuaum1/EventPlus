
using apiweb.eventplus.manha.Domains;
using webapi.event_.manha.Domains;

namespace apiweb.eventplus.manha.Interfaces
{
    public interface ITipoUsuarioRepository
    {
        void Cadastrar(TiposUsuario tipoUsuario);
        void Delete(Guid id);
        List<TiposUsuario> Listar();
        TiposUsuario BuscarPorId(Guid id);
        void Atualizar(Guid id, TiposUsuario tipoUsuario);
    }
}
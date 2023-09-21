using Microsoft.AspNetCore.Http.HttpResults;
using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Utils;

namespace webapi.event_.manha.Repositories
{
    public class TiposUsuarioRepository
    {
        private readonly EventContext eventContext ;

        public TiposUsuarioRepository()
        { 
        eventContext = new EventContext();
        }

        public void Atualizar(Guid Id, TiposUsuario tiposUsuario)
        { 
        throw new NotImplementedException();
        }

        public TiposUsuario BuscarPorId(Guid Id) 
        {
            return null;
        }

        public void Cadastrar(TiposUsuario tiposUsuario)
        {
            eventContext.TiposUsuarios.Add(tiposUsuario);
            eventContext.SaveChanges();
        
        }



    }
    
}

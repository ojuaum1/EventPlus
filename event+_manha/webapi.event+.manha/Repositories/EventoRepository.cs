using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace webapi.event_.manha.Repositories
{
    public class EventoRepository : IEvento
    {
        public void atualizar(Guid id, Evento evento)
        {
            
        }

        public Evento BuscarPorId(Guid Id)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(Evento evento)
        {
            throw new NotImplementedException();
        }

        public void Deletar(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}

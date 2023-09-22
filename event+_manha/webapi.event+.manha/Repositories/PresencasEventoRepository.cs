using apiweb.eventplus.manha.Domains;
using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace webapi.event_.manha.Repositories
{
    
    public class PresencasEventoRepository : IPresencaEvento
    {
        private readonly EventContext _eventContext;

        public PresencasEventoRepository()
        {
         _eventContext = new EventContext();
        }
   
        public void Atualizar(Guid id, PresencaEvento presencaEvento)
        {
            PresencaEvento PresencasAntigo = _eventContext.PresencaEventos.FirstOrDefault(z => z.IdPresencaEvento == id)!;

            if (PresencasAntigo != null)
            {
                PresencasAntigo.IdPresencaEvento = presencaEvento.IdPresencaEvento;

                _eventContext.TiposEventos.Update(tipoAntigo);
                _eventContext.SaveChanges();
            }
        }

        public PresencaEvento BuscarPorId(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public List<PresencaEvento> Listar()
        {
            throw new NotImplementedException();
        }
    }
}

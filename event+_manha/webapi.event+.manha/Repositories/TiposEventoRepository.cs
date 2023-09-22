using apiweb.eventplus.manha.Interfaces;
using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace apiweb.eventplus.manha.Repositories
{
    public class TipoEventoRepository : ITipoEventoRepository
    {
        private readonly EventContext _eventContext;
        public TipoEventoRepository()
        {
            _eventContext = new EventContext();
        }
        public void Atualizar(Guid id, TiposEvento tipoEvento)
        {
            TiposEvento tipoAntigo = _eventContext.TiposEventos.FirstOrDefault(z => z.IdTipoEvento == id)!;

            if (tipoAntigo != null)
            {
                tipoAntigo.Titulo = tipoEvento.Titulo;

                _eventContext.TiposEventos.Update(tipoAntigo);
                _eventContext.SaveChanges();
            }
        }

        public TiposEvento BuscarPorId(Guid id)
        {
            TiposEvento tipoBuscado = _eventContext.TiposEventos.FirstOrDefault(z => z.IdTipoEvento == id)!;

            if (tipoBuscado != null)
            {
                return tipoBuscado;
            }
            return null!;
        }

        public void Cadastrar(TiposEvento tipoEvento)
        {
            if (tipoEvento != null)
            {
                _eventContext.TiposEventos.Add(tipoEvento);
                _eventContext.SaveChanges();
            }
        }

        public void Delete(Guid id)
        {
            TiposEvento tipoDeletado = _eventContext.TiposEventos.FirstOrDefault(z => z.IdTipoEvento == id)!;

            _eventContext.TiposEventos.Remove(tipoDeletado);

            _eventContext.SaveChanges();

        }

        public List<TiposEvento> Listar()
        {
            return _eventContext.TiposEventos.ToList();
        }
    }
}

    public class TiposEventoRepository
    {
    }


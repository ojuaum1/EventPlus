using apiweb.eventplus.manha.Domains;
using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace apiweb.eventplus.manha.Repositories
{
    public class InstituicaoRepository : Instituicao
    {
        private readonly EventContext _eventContext;

        public InstituicaoRepository()
        {
            _eventContext = new EventContext();
        }

        public void Cadastrar(Institucao institucao)
        {
            _eventContext.Institucaos.Add(institucao);

            _eventContext.SaveChanges();
        }


    }
}
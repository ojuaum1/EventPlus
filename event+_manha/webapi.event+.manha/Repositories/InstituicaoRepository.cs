using apiweb.eventplus.manha.Domains;
using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace apiweb.eventplus.manha.Repositories
{
    public class InstituicaoRepository : webapi.event_.manha.Interfaces.Instituicao
    {
        private readonly EventContext _eventContext;

        public InstituicaoRepository()
        {
            _eventContext = new EventContext();
        }

        public void Cadastrar(webapi.event_.manha.Domains.Instituicao institucao)
        {
            _eventContext.Institucaos.Add(institucao);

            _eventContext.SaveChanges();
        }


    }
}
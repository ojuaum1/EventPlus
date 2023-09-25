using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;
using apiweb.eventplus.manha.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;

namespace apiweb.eventplus.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class InstituicaoController : ControllerBase
    {
      private IInstituicao _instituicao;
        public InstituicaoController()
        {
            _instituicao = new InstituicaoRepository();
        }

        [HttpPost]
        public IActionResult Post(Instituicao instituicao)
        {
            try
            {
                if (instituicao != null)
                {
                    _instituicao.Cadastrar(Instituicao instituicao);
                    return Ok("Usuario cadastrado!");

                }

                return Ok("Usuario não foi inserido corretamente!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

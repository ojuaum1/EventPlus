using apiweb.eventplus.manha.Domains;
using apiweb.eventplus.manha.Interfaces;
using apiweb.eventplus.manha.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace apiweb.eventplus.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class InstituicaoController : ControllerBase
    {
        IInstituicaoRepository _instituicaoRepository;
        public InstituicaoController()
        {
            _instituicaoRepository = new InstituicaoRepository();
        }

        [HttpPost]
        public IActionResult Post(Instituicao instituicao)
        {
            try
            {
                if (instituicao != null)
                {
                    _instituicaoRepository.Cadastrar(instituicao);
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

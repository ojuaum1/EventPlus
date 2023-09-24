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
    public class PresencaEventoController : ControllerBase
    {
        IPresencaEventoRepository _presencaRepository;
        public PresencaEventoController()
        {
            _presencaRepository = new PresencaEventoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_presencaRepository.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(PresencaEvento presencaEvento)
        {
            try
            {
                if (presencaEvento != null)
                {
                    _presencaRepository.Cadastrar(presencaEvento);
                    return Ok("Presenca cadastrada");
                }
                return Ok("Presenca não foi inserida corretamente");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _presencaRepository.Delete(id);
                return Ok("Presença deletada!");
            }
            catch (Exception e)
            {
                BadRequest(e.Message);
                throw;
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, PresencaEvento presenca)
        {
            try
            {
                _presencaRepository.Atualizar(id, presenca);
                return Ok("Presenca atualizada");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetWithUser(Guid id)
        {
            try
            {
                return Ok(_presencaRepository.ListarMinhaPresenca(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

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
    public class TipoEventoController : ControllerBase
    {
        private ITipoEventoRepository _tipoEventoRepository;

        public TipoEventoController()
        {
            _tipoEventoRepository = new TipoEventoRepository();
        }

        [HttpGet]
        public IActionResult GetList()
        {
            try
            {
                return Ok(_tipoEventoRepository.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(TipoEvento tipoEvento)
        {
            try
            {
                if (tipoEvento != null)
                {
                    _tipoEventoRepository.Cadastrar(tipoEvento);

                    return Ok("Tipo de evento cadastrado");
                }
                return Ok("Tipo de evendo não foi digitado corretamente");
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
                if (_tipoEventoRepository.BuscarPorId(id) != null)
                {
                    _tipoEventoRepository.Delete(id);
                    
                    return Ok("Tipo de Evento deletado!");
                }
                return Ok("O Tipo de evento buscado não aparece!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetWithId(Guid id)
        {
            try
            {
                TipoEvento tipoBuscado = _tipoEventoRepository.BuscarPorId(id);
                if (tipoBuscado != null)
                {
                    return Ok(tipoBuscado);
                }

                return Ok("Tipo de evento não encontrado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, TipoEvento tipoEvento)
        {
            try
            {
                _tipoEventoRepository.Atualizar(id, tipoEvento);
                return Ok("Tipo de evento atualizado");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

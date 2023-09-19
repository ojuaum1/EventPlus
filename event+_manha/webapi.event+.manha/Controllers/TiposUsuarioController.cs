using apiweb.eventplus.manha.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Repositories;

namespace webapi.event_.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TiposUsuarioController : ControllerBase
    {
        private ITipoUsuarioRepository tipoUsuarioRepository;
        private TiposUsuarioRepository _TiposUsuarioRepository;

        public TiposUsuarioController()
        {
            _TiposUsuarioRepository = new TiposUsuarioRepository();
        }
        [HttpPost]

        public IActionResult Post(TiposUsuario tiposUsuario)
        {
            try
            {
                _TiposUsuarioRepository.Cadastrar(tiposUsuario);

                return StatusCode(201);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);           
            }
        }
    }
}

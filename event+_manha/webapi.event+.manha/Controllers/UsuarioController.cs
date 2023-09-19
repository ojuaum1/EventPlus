﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;
using webapi.event_.manha.Repositories;

namespace webapi.event_.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository;

        public UsuarioController()
        {
            usuarioRepository = new UsuarioRepository();
        }
        
        [HttpPost]
        public IActionResult Post(Usuario usuario)
        {
            try
            {
                usuarioRepository.Cadastrar(usuario);
                return StatusCode(201);

            }
            catch (Exception e)
            {

              return BadRequest(e.Message);
            }
        
        }
           
    }
}

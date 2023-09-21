using apiweb.eventplus.manha.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;
using webapi.event_.manha.Repositories;

namespace apiweb.eventplus.manha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Get(LoginViewModel usuario)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.BuscarPorEmailEsenha(usuario.Email!, usuario.Senha!);

                if (usuarioBuscado != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Jti,usuarioBuscado.IdUsuario.ToString()),
                        new Claim("idezinho",usuarioBuscado.IdTipoUsuario.ToString()),
                        new Claim(JwtRegisteredClaimNames.Name,usuarioBuscado.Nome!),
                        new Claim(JwtRegisteredClaimNames.Email,usuarioBuscado.Email!),
                        new Claim(ClaimTypes.Role,usuarioBuscado.TiposUsuario!.Titulo!)
                    };

                    //2º - Defiir a chave de acesso ao token
                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("projeto-event-chave-autenticacao-webapi-dev"));

                    //3º - Definir as credenciais do token (HEADER)
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    //4º - Gerar token
                    var token = new JwtSecurityToken
                    (
                        //emissor do token (O NOME DO projeto)
                        issuer: "webapi.event+.manha",

                        //Destinatário do token (TAMBÉM O NOME DO PROJETO)
                        audience: "webapi.event+.manha",

                        //dados definidos nas claims(informalções)
                        claims: claims,

                        //tempo de expiração do token
                        expires: DateTime.Now.AddMinutes(5),

                        //credenciais do token
                        signingCredentials: creds
                    );

                    //5º - retornar o token criado
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token)
                    });
                }
                return Ok(null);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}
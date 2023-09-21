using Microsoft.EntityFrameworkCore;
using webapi.event_.manha.Contexts;
using webapi.event_.manha.Domains;
using webapi.event_.manha.Interfaces;
using webapi.event_.manha.Utils;

namespace webapi.event_.manha.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly EventContext _eventContext;

        public UsuarioRepository() 
        {
            _eventContext= new EventContext();
        }


        public Usuario BuscarPorEmailEsenha(string email, string senha)
        {
            try
            {
                Usuario usuarioBuscado = _eventContext.Usuarios
                    .Select(u => new Usuario
                    {
                        IdUsuario = u.IdUsuario,
                        Nome = u.Nome,
                        Email = u.Email,
                        Senha = u.Senha,
                        TiposUsuario = new TiposUsuario
                        {
                            IdTipoUsuario = u.IdTipoUsuario,
                            Titulo = u.TiposUsuario!.Titulo
                        }
                    }).FirstOrDefault(u => u.Email == email)!;

                if (usuarioBuscado != null)
                {
                    bool confere = Criptografia.CompararHash(senha, usuarioBuscado.Senha!);

                    if (confere)
                    {
                        return usuarioBuscado;
                    }
                }
                return null!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario BuscarPorId(Guid Id)
        {
            try
            {
                Usuario UsuarioBuscado = _eventContext.Usuarios
                    .Select(u => new Usuario
                    { 
                    IdUsuario = u.IdUsuario,
                        Nome = u.Nome,

                        TiposUsuario = new TiposUsuario
                        { 
                        Titulo = u.TiposUsuario!.Titulo
                        }
                }).FirstOrDefault(u => u.IdUsuario == Id)!;

                if (UsuarioBuscado != null)
                {
                    return UsuarioBuscado;
                }
                return null!;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Cadastrar(Usuario usuario)
        {
            try
            {
                usuario.Senha = Criptografia.GerarHash(usuario.Senha);

                _eventContext.Usuarios.Add(usuario);

                _eventContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

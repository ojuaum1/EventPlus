using apiweb.eventplus.manha.Domains;
using Microsoft.EntityFrameworkCore;
using webapi.event_.manha.Domains;

namespace webapi.event_.manha.Contexts
{
    public class EventContext : DbContext
    {
    public DbSet <TiposUsuario>  TiposUsuarios{ get; set; }
    public DbSet <Usuario>  Usuarios{ get; set; }
    public DbSet <ComentariosEvento>  ComentariosEventos{ get; set; }
    public DbSet <Evento>  Eventos{ get; set; }
    public DbSet <Institucao>  Institucaos{ get; set; }
    public DbSet <PresencaEvento>  PresencaEventos{ get; set; }
    public DbSet <TiposEvento>  TiposEventos{ get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=NOTE03-S15; Database=BdEventao; User Id = sa; pwd = Senai@134; TrustServerCertificate=true;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}

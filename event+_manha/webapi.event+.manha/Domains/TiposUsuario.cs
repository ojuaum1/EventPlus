using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace webapi.event_.manha.Domains
{
    [Table(nameof(TiposUsuario))]
    public class TiposUsuario
    {
            [Key]
            public Guid IdTipoUsuario { get; set; } = Guid.NewGuid();

            [Column(TypeName = "VARCHAR(100)")]
            [Required(ErrorMessage = "Titulo do Tipo Usuario é obrigatorioi!")]
            public String? Titulo { get; set; }
        
    }
}

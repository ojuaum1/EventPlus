using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.event_.manha.Domains
{
    [Table(nameof(ComentariosEvento))]
    public class ComentariosEvento
    {
        [Key]
        public Guid IdComentariosEvento { get; set; } = Guid.NewGuid();

        [Column(TypeName = "TEXT")]
        [Required(ErrorMessage = "a descrição é obrigatoria")]
        public string? Descrição { get; set; }

        [Column(TypeName = "BIT")]
        [Required(ErrorMessage = "a informacao e obrigatoria")]

        public bool Exibe { get; set; }


    }
}

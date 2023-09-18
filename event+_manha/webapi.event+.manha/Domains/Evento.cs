using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.event_.manha.Domains
{
    [Table(nameof(Evento))]
    public class Evento
    {
        [Key]
        public Guid IdEvento { get; set; } = Guid.NewGuid();

        [Column(TypeName = "DATE")]
        [Required(ErrorMessage ="Data do evento obrigatoria")]

        public string? DataEvento { get; set; }
        
        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Nome do evento obrigatoria")]
        public string? NomeEvento { get; set; }

        [Column(TypeName = "Text")]
        [Required(ErrorMessage = "Nome do evento obrigatoria")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "o tipo do evento e obrigatorio")]

        public Guid IdTipoEvento { get; set; }

        [ForeignKey(nameof(IdTipoEvento))]
        public TiposEvento? TiposEvento { get; set; }

        //ref na tabela instituicao
        [Required(ErrorMessage ="Instituicao obrigatoria")]
        public Guid IdInstituicao { get; set; }

        [ForeignKey(nameof(IdInstituicao))]
        public Institucao Institucao { get; set; }
    }
}

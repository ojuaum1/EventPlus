using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace webapi.event_.manha.Domains
{
    [Table(nameof(Institucao))]
    [Index(nameof(CNPJ),IsUnique = true)]
    public class Institucao
    {
        [Key]
        public Guid IdInstituicao { get; set; }

        [Column(TypeName ="Char(14)")]
        [Required(ErrorMessage ="CNPJ obrigatorio")]
        [StringLength(14)]
        public string? CNPJ { get; set; }
        [Column(TypeName = "VARCHAR(150)")]
        [Required(ErrorMessage = "O ENDERECO E OBRIGATORIO! ")]

        public string endereco { get; set; }

        [Column(TypeName = "VARCHAR(150)")]
        [Required(ErrorMessage = "O Nome fantasia e obrigatorio! ")]

        public string? NOmeFantasia { get; set; }
    }
}

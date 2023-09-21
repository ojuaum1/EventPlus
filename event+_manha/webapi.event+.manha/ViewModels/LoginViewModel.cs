using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace apiweb.eventplus.manha.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "O email é obrigatório")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Nome da senha obrigatório")]
        [StringLength(60, MinimumLength = 6, ErrorMessage = "Senha deve conter de 6 a 60 digitos")]
        public string? Senha { get; set; }
    }
}
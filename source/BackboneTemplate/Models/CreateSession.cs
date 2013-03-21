namespace BackboneTemplate.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateSession
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool? RememberMe { get; set; }
    }
}
namespace $safeprojectname$.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ForgotPassword
    {
        [Required]
        public string Email { get; set; }
    }
}
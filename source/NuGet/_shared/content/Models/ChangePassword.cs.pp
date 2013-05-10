namespace $rootnamespace$.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ChangePassword
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(64, MinimumLength = 6)]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}

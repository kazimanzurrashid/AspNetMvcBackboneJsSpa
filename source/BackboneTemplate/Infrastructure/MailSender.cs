namespace ClassyDiagram.Infrastructure
{
    using System.Threading.Tasks;

    using Postal;

    public interface IMailer
    {
        Task UserConfirmationAsync(string receipent, string token);

        Task PasswordTokenAsync(string receipent, string token);

        Task PasswordResetAsync(string receipent);
    }

    public class Mailer : IMailer
    {
        private readonly string sender;
        private readonly IUrlResolver urlResolver;
        private readonly IEmailService emailService;

        public Mailer(string sender, IUrlResolver urlResolver, IEmailService emailService)
        {
            this.sender = sender;
            this.urlResolver = urlResolver;
            this.emailService = emailService;
        }

        public Task UserConfirmationAsync(string receipent, string token)
        {
            dynamic email = new Email("UserConfirmation");
            email.To = receipent;
            email.From = sender;
            email.Url = urlResolver.UserConfirmation(token);

            return emailService.SendAsync(email);
        }

        public Task PasswordTokenAsync(string receipent, string token)
        {
            dynamic email = new Email("PasswordToken");
            email.To = receipent;
            email.From = sender;

            return emailService.SendAsync(email);
        }

        public Task PasswordResetAsync(string receipent)
        {
            dynamic email = new Email("PasswordReset");
            email.To = receipent;
            email.From = sender;

            return emailService.SendAsync(email);
        }
    }
}
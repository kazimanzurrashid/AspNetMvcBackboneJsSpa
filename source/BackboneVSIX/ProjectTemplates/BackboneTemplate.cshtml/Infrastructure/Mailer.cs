namespace $safeprojectname$.Infrastructure
{
    using System.Configuration;
    using System.Threading.Tasks;

    using Postal;

    public interface IMailer
    {
        Task UserConfirmationAsync(string receipent, string token);

        Task ForgotPasswordAsync(string receipent, string token);
    }

    public class Mailer : IMailer
    {
        private readonly string sender;
        private readonly IMailUrlResolver urlResolver;
        private readonly IEmailService emailService;

        public Mailer() : 
            this(
            ConfigurationManager.AppSettings["sender.email"],
            new MailUrlResolver(),
            new EmailService())
        {
        }

        public Mailer(string sender, IMailUrlResolver urlResolver, IEmailService emailService)
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

        public Task ForgotPasswordAsync(string receipent, string token)
        {
            dynamic email = new Email("ForgotPassword");
            email.To = receipent;
            email.From = sender;
            email.Url = urlResolver.ForgotPassword(token);

            return emailService.SendAsync(email);
        }
    }
}
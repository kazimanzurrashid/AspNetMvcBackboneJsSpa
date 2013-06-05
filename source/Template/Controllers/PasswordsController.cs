namespace BackboneTemplate.Controllers
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    using WebMatrix.WebData;

    using Infrastructure;
    using Models;

    public class PasswordsController : ApiController
    {
        private readonly Func<string, string> forgotPassword;
        private readonly Func<string, string, string, bool> changePassword;
        private readonly IMailer mailer;

        public PasswordsController()
            : this(
                userName =>
                {
                    try
                    {
                        return WebSecurity.GeneratePasswordResetToken(userName);
                    }
                    catch (InvalidOperationException)
                    {
                    }

                    return null;
                },
                WebSecurity.ChangePassword,
                new Mailer())
        {
        }

        public PasswordsController(
            Func<string, string> forgotPassword,
            Func<string, string, string, bool> changePassword,
            IMailer mailer)
        {
            this.forgotPassword = forgotPassword;
            this.changePassword = changePassword;
            this.mailer = mailer;
        }

        public async Task<HttpResponseMessage> Forgot(ForgotPassword model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.BadRequest,
                    ModelState);
            }

            var userName = model.Email.ToLowerInvariant();
            var token = forgotPassword(userName);

            if (!string.IsNullOrWhiteSpace(token))
            {
                await mailer.ForgotPasswordAsync(userName, token);
            }

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        [Authorize]
        public HttpResponseMessage Change(ChangePassword model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.BadRequest,
                    ModelState);
            }

            try
            {
                if (changePassword(
                    User.Identity.Name,
                    model.OldPassword,
                    model.NewPassword))
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }

                ModelState.AddModelError(
                    "oldPassword",
                    "Old password does not match existing password.");
            }
            catch (ArgumentException)
            {
                ModelState.AddModelError(
                    "newPassword",
                    "New password does not meet password rule.");
            }

            return Request.CreateErrorResponse(
                HttpStatusCode.BadRequest,
                ModelState);
        }
    }
}
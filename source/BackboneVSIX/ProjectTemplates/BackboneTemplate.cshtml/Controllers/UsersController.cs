namespace $safeprojectname$.Controllers
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Security;

    using WebMatrix.WebData;

    using Infrastructure;
    using Models;

    public class UsersController : ApiController
    {
        private readonly Func<string, string, string> signup;
        private readonly IMailer mailer;

        public UsersController()
            : this(
                (userName, password) =>
                    WebSecurity.CreateUserAndAccount(
                    userName,
                    password,
                    requireConfirmationToken: true),
                new Mailer())
        {
        }

        public UsersController(
            Func<string, string, string> signup,
            IMailer mailer)
        {
            this.signup = signup;
            this.mailer = mailer;
        }

        public async Task<HttpResponseMessage> Post(CreateUser model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.BadRequest, ModelState);
            }

            var statusCode = MembershipCreateStatus.Success;
            var userName = model.Email.ToLowerInvariant();
            var token = string.Empty;

            try
            {
                token = signup(userName, model.Password);
            }
            catch (MembershipCreateUserException e)
            {
                statusCode = e.StatusCode;
            }

            if (statusCode == MembershipCreateStatus.Success)
            {
                await mailer.UserConfirmationAsync(userName, token);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            }

            switch (statusCode)
            {
                case MembershipCreateStatus.DuplicateUserName:
                case MembershipCreateStatus.DuplicateEmail:
                case MembershipCreateStatus.DuplicateProviderUserKey:
                    ModelState.AddModelError(
                        "email",
                        "User with same email already exits.");
                    break;
                case MembershipCreateStatus.InvalidUserName:
                case MembershipCreateStatus.InvalidEmail:
                    ModelState.AddModelError(
                        "email",
                        "Invalid email address.");
                    break;
                case MembershipCreateStatus.InvalidPassword:
                    ModelState.AddModelError("password", "Invalid password.");
                    break;
                default:
                    ModelState.AddModelError(
                        string.Empty,
                        "Unexpected error.");
                    break;
            }

            return Request.CreateErrorResponse(
                HttpStatusCode.BadRequest, ModelState);
        }
    }
}
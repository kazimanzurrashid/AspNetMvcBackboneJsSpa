namespace $safeprojectname$.Infrastructure
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;

    public interface IMailUrlResolver
    {
        string UserConfirmation(string token);

        string ForgotPassword(string token);
    }

    public class MailUrlResolver : IMailUrlResolver
    {
        private readonly Func<HttpContextBase> lazyHttpContext;
 
        public MailUrlResolver() :
            this(() => new HttpContextWrapper(HttpContext.Current))
        {
        }

        public MailUrlResolver(Func<HttpContextBase> lazyHttpContext)
        {
            this.lazyHttpContext = lazyHttpContext;
        }

        public string UserConfirmation(string token)
        {
            return GenerateUrl("user-confirmation", token);
        }

        public string ForgotPassword(string token)
        {
            return GenerateUrl("password-reset", token);
        }

        private static string Root(UrlHelper helper)
        {
            var request = helper.RequestContext.HttpContext.Request;

            if (request.Url == null)
            {
                throw new InvalidOperationException("Unable to get current url.");
            }

            var root = request.Url.GetLeftPart(UriPartial.Authority) +
                request.ApplicationPath;

            return root;
        }

        private string GenerateUrl(string routeName, string token)
        {
            var helper = UrlHelper();
            var root = Root(helper);
            var relativeUrl = helper.RouteUrl(routeName, new { token });

            if (relativeUrl == null)
            {
                throw new InvalidOperationException("Unable to generate relative url.");
            }

            var uri = new Uri(new Uri(root), relativeUrl);

            return uri.ToString();
        }

        private UrlHelper UrlHelper()
        {
            var httpContext = lazyHttpContext();

            return new UrlHelper(
                new RequestContext(httpContext, new RouteData()));
        }
    }
}
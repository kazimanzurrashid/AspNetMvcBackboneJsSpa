namespace BackboneTemplate.Infrastructure
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "user-confirmation",
                "users/confirm/{token}",
                new
                {
                    controller = "Supports",
                    action = "ConfirmUser"
                });

            routes.MapRoute(
                "password-reset",
                "passwords/reset/{token}",
                new
                {
                    controller = "Supports",
                    action = "ResetPassword"
                });

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new
                    {
                        controller = "Home",
                        action = "Index",
                        id = UrlParameter.Optional
                    });
        }
    }
}
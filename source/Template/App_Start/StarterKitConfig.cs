[assembly: WebActivator.PreApplicationStartMethod(typeof(BackboneTemplate.Infrastructure.StarterKitConfig), "PreStart")]
[assembly: WebActivator.PostApplicationStartMethod(typeof(BackboneTemplate.Infrastructure.StarterKitConfig), "PostStart")]

namespace BackboneTemplate.Infrastructure
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    using BackboneTemplate.Models;

    using WebMatrix.WebData;

    public class StarterKitConfig
    {
        public static void PreStart()
        {
            RegisterRoutes(RouteTable.Routes);
        }

        public static void PostStart()
        {
            RegisterBundles(BundleTable.Bundles);
            RegisterMembership();
        }

        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Content/application.css"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/json2")
                .Include("~/Scripts/json2.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
                .Include("~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/backbone")
                .Include("~/Scripts/underscore.js")
                .Include("~/Scripts/Backbone.js"));

            bundles.Add(new ScriptBundle("~/bundles/application")
                .Include("~/Scripts/_config.js")
                .IncludeDirectory("~/Scripts/application", "*.js", true));

#if DEBUG
            bundles.Add(new ScriptBundle("~/bundles/bdd")
                .Include("~/Scripts/specs/bdd/mocha.js")
                .Include("~/Scripts/specs/bdd/chai.js")
                .Include("~/Scripts/specs/bdd/sinon.js")
                .Include("~/Scripts/specs/bdd/fixtures.js")
                .IncludeDirectory("~/Scripts/specs/bdd", "*.js"));

            bundles.Add(new ScriptBundle("~/bundles/specs")
                .Include("~/Scripts/specs/helpers.js")
                .IncludeDirectory("~/Scripts/specs/application", "*.js", true));
#endif
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapHttpRoute(
                "PasswordsRpcApi",
                "api/passwords/{action}",
                new { controller = "passwords" });

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
        }

        public static void RegisterMembership()
        {
            Database.SetInitializer<UsersContext>(null);

            try
            {
                using (var context = new UsersContext())
                {
                    if (!context.Database.Exists())
                    {
                        ((IObjectContextAdapter)context).ObjectContext.CreateDatabase();
                    }
                }

                WebSecurity.InitializeDatabaseConnection("DefaultConnection", "Users", "Id", "Email", true);
            }
            catch (Exception e)
            {
                throw new InvalidOperationException("The ASP.NET Simple Membership database could not be initialized. For more information, please see http://go.microsoft.com/fwlink/?LinkId=256588", e);
            }
        }
    }
}
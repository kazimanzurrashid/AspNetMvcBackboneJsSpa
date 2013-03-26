namespace BackboneTemplate.Infrastructure
{
    using System.Web.Optimization;

    public class BundleConfig
    {
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
        }
    }
}
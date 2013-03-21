namespace $safeprojectname$.Helpers
{
    using System;
    using System.Web.Mvc;

    public static class UrlHelperExtensions
    {
        public const string ClientPrefix = "#!/";

        public static string ClientUrlPrefix(this UrlHelper instance)
        {
            return ClientPrefix;
        }

        public static string ApiUrlPrefix(this UrlHelper instance)
        {
            // ReSharper disable Html.PathError
            var root = instance.Content("~/api");
            // ReSharper restore Html.PathError
            if (root.EndsWith("/", StringComparison.Ordinal))
            {
                root = root.Substring(0, root.Length - 1);
            }

            return root;
        }

        public static string ClientUrl(
            this UrlHelper instance,
            params string[] paths)
        {
            var url = ClientPrefix;

            var relativePath = string.Join("/", paths);

            if (relativePath.StartsWith("/", StringComparison.Ordinal) &&
                relativePath.Length > 0)
            {
                relativePath = relativePath.Substring(1);
            }

            if (relativePath.EndsWith("/", StringComparison.Ordinal) &&
                relativePath.Length > 0)
            {
                relativePath = relativePath.Substring(
                    0, relativePath.Length - 1);
            }

            url += relativePath;

            return url;
        }
    }
}
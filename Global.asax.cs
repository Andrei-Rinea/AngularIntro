using System;
using System.Web;
using System.Web.Http;

namespace AngularIntro
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            var configuration = GlobalConfiguration.Configuration;
            configuration.Routes.MapHttpRoute(
                "default",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional });

            UnityConfig.RegisterComponents();
        }
    }
}
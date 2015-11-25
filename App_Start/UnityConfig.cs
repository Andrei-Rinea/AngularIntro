using System.Web.Hosting;
using Microsoft.Practices.Unity;
using System.Web.Http;
using AngularIntro.Services;
using Unity.WebApi;

namespace AngularIntro
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();
            var appDataPath = HostingEnvironment.MapPath("~/App_Data");
            container.RegisterInstance<IContactRepository>(new CsvFileContactRepository(appDataPath, "data.csv"));
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}
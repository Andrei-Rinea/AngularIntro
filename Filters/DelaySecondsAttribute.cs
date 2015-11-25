// © 2015 Intralinks, Inc.

using System;
using System.Threading;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace AngularIntro.Filters
{
    public class DelaySecondsAttribute : ActionFilterAttribute
    {
        private readonly TimeSpan _duration;

        public DelaySecondsAttribute(ushort seconds = 2) : this(TimeSpan.FromSeconds(seconds)) { }
        private DelaySecondsAttribute(TimeSpan duration)
        {
            _duration = duration;
        }

        /// <summary>
        /// Occurs before the action method is invoked.
        /// </summary>
        /// <param name="actionContext">The action context.</param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);
            Thread.Sleep(_duration);
        }
    }
}